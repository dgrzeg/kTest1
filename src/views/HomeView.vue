<template>
  <div class="home">
    <div v-if="error">{{ error }}</div>
    <div v-else>
      <div v-if="users.length">
        <UserList :users="users" />
      </div>
      <div v-else>Loading...</div>
    </div>
    <button @click="getMoreUsers" class="home__more">more</button>
  </div>
</template>

<script>
import getUsers from '@/hooks/getUsers.js';
import UserList from '@/components/UserList.vue';
import { ref } from '@vue/reactivity';
export default {
  components: {
    UserList,
  },
  setup() {
    const seed = ref('asd');
    const usersCount = ref(5);
    const { users, error, loadUsers } = getUsers();
    loadUsers(usersCount.value, seed.value);

    const getMoreUsers = () => {
      usersCount.value += 5;
      loadUsers(usersCount.value, seed.value);
    };

    return { users, error, getMoreUsers };
  },
};
</script>

<style lang="scss">
.home {
  margin: 3rem auto;
  max-width: 120rem;
  text-align: center;

  &__more {
    border: 2px solid var(--bg-color);
    width: 10rem;
    height: 4rem;
    border-radius: 0.5rem;
    text-align: center;
    text-transform: uppercase;
    cursor: pointer;
    color: white;
    background-color: var(--bg-color);
    display: inline-block;
    transition: all 0.3s ease-out;
    font-weight: bold;

    &:hover {
      color: var(--bg-color);
      background-color: white;
      transform: translateY(-1px);
      box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);
    }

    &:active {
      transform: translateY(3px);
      box-shadow: 0 0.2rem 0.3rem rgba(0, 0, 0, 0.5);
    }

    // box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
  }
}
</style>
