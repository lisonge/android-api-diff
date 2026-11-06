import assert from 'node:assert/strict';
import test from 'node:test';
import { createMemoryHistory, createRouter } from 'vue-router';
import {
  readSearchRoute,
  searchLocation,
} from '../src/views/home/searchRoute.ts';

test('search text round-trips only through /i/ paths', async () => {
  const router = createRouter({
    history: createMemoryHistory(),
    routes: [
      { path: '/', component: {} },
      { path: '/i/:pathMatch(.*)*', component: {} },
    ],
  });
  const read = () =>
    readSearchRoute(router.currentRoute.value.params.pathMatch);
  for (const text of [
    'UserInfo.name',
    'Binder()',
    'Binder#pingBinder',
    'core/java/android/os/Binder.java',
    'platform/frameworks/base/core/java/android/os/Binder.java',
  ]) {
    await router.replace(searchLocation(text));
    assert.deepEqual(read().input, { mode: 'name', text });
    assert.deepEqual(router.currentRoute.value.query, {});
    assert.equal(router.currentRoute.value.hash, '');
  }
  await router.replace(
    '/i/UserInfo.name?name=Other&repo=base&path=Other.java&target=Other&anchor=tag&ref=Other#ignored',
  );
  assert.equal(read().text, 'UserInfo.name');
  await router.replace('/?name=Other&ref=Other');
  assert.equal(read().text, '');
  await router.replace(searchLocation(''));
  assert.equal(router.currentRoute.value.fullPath, '/');
});
