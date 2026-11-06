import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { uploadPoliciesAssets } from 'user-attachments';

const main = async () => {
  const issue = 'https://github.com/lisonge/android-api-diff/issues/1';
  const subjectId = 'I_kwDOQW3KCc8AAAABcwJpCw';
  const cookie = process.env.GITHUB_COOKIE;
  if (!cookie) throw new Error('GITHUB_COOKIE is not available');
  const bytes = await readFile(
    new URL(
      '../android-api-diff/src/core/catalog/generated/index-data.json',
      import.meta.url,
    ),
  );
  const index = JSON.parse(bytes.toString('utf8'));
  if (index.schemaVersion !== 3)
    throw new Error('Unsupported source index schema');
  const safeFetch = async (
    url: string | URL | Request,
    init: RequestInit = {},
  ) => {
    const target = new URL(url instanceof Request ? url.url : url);
    const headers = new Headers(init.headers);
    headers.delete('cookie');
    if (target.origin === 'https://github.com') headers.set('cookie', cookie);
    return fetch(target, { ...init, headers });
  };
  const resultPath = new URL(
    '../.cache/index-upload-result.json',
    import.meta.url,
  );
  await mkdir(new URL('./', resultPath), { recursive: true });
  const asset = await uploadPoliciesAssets({
    repositoryId: '1097714185',
    file: new File([bytes], 'index-data.json', { type: 'application/json' }),
    fetch: safeFetch,
  });
  const result: {
    issue: string;
    href: string;
    size: number;
    sha256: string;
    commentId?: string;
    temporaryCommentDeleted?: boolean;
    verified?: boolean;
  } = {
    issue,
    href: asset.href,
    size: bytes.length,
    sha256: createHash('sha256').update(bytes).digest('hex'),
  };
  await writeFile(resultPath, JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify({ uploaded: result.href, size: result.size }));
  const graphql = async (data: unknown) => {
    const r = await safeFetch('https://github.com/_graphql', {
      method: 'POST',
      headers: {
        'content-type': 'text/plain;charset=UTF-8',
        accept: 'application/json',
        'github-verified-fetch': 'true',
        origin: 'https://github.com',
        referer: issue,
      },
      body: JSON.stringify(data),
    });
    if (!r.ok) throw new Error('GitHub comment HTTP ' + r.status);
    const body = await r.json();
    if (body.errors)
      throw new Error(
        'GitHub comment mutation failed: ' +
          body.errors.map((e: { message: string }) => e.message).join('; '),
      );
    return body;
  };
  const comment = await graphql({
    persistedQueryName: 'addCommentMutation',
    query: 'edafa18ab5734f05c9893cbc92d0dfb1',
    variables: {
      connections: [
        `client:${subjectId}:__Issue__backTimelineItems_connection(visibleEventsOnly:true)`,
      ],
      input: { body: asset.href, subjectId },
    },
  });
  const commentId = comment.data?.addComment?.timelineEdge?.node?.id;
  if (!commentId) throw new Error('GitHub did not return comment ID');
  result.commentId = commentId;
  await writeFile(resultPath, JSON.stringify(result, null, 2) + '\n');
  await new Promise((r) => setTimeout(r, 1000));
  await graphql({
    persistedQueryName: 'deleteIssueCommentMutation',
    query: 'b0f125991160e607a64d9407db9c01b3',
    variables: {
      connections: [
        `client:${subjectId}:__Issue__frontTimelineItems_connection(visibleEventsOnly:true)`,
        `client:${subjectId}:__Issue__backTimelineItems_connection(visibleEventsOnly:true)`,
      ],
      input: { id: commentId },
    },
  });
  result.temporaryCommentDeleted = true;
  await writeFile(resultPath, JSON.stringify(result, null, 2) + '\n');
  const downloaded = await fetch(asset.href);
  if (!downloaded.ok)
    throw new Error('Attachment verification HTTP ' + downloaded.status);
  const hash = createHash('sha256')
    .update(Buffer.from(await downloaded.arrayBuffer()))
    .digest('hex');
  if (hash !== result.sha256) throw new Error('Attachment content mismatch');
  result.verified = true;
  await writeFile(resultPath, JSON.stringify(result, null, 2) + '\n');
  console.log(JSON.stringify(result));

  const generated = new URL(
    '../android-api-diff/src/core/catalog/generated/',
    import.meta.url,
  );
  await writeFile(
    new URL('index-asset.json', generated),
    JSON.stringify(
      {
        url: result.href,
        sha256: result.sha256,
        size: result.size,
        revision: index.revision,
      },
      null,
      2,
    ) + '\n',
  );
  await writeFile(
    new URL('metadata-data.json', generated),
    JSON.stringify({
      schemaVersion: 2,
      revision: index.revision,
      versions: index.versions,
    }) + '\n',
  );
  console.log(
    'Updated index-asset.json and metadata-data.json; commit these small files.',
  );
};
main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : 'Index upload failed');
  process.exitCode = 1;
});
