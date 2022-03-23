<template>
  <div class="users">
    <UserDetails v-for="user in users" :key="user.id.value" :user="user" />
  </div>
</template>

<script>
import UserDetails from '@/components/UserDetails.vue';
export default {
  props: ['users'],
  components: {
    UserDetails,
  },
  setup() {},
};
</script>

<style lang="scss">
.users {
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  padding: 2rem;
  justify-items: center;

  @media (min-width: 60em) {
    grid-template-columns: repeat(2, 1fr);
  }

  // @media (min-width: 70em) {
  //   grid-template-columns: repeat(3, 1fr);
  // }
}
</style>
