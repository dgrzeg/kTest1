import { ref } from 'vue';

const getUsers = () => {
  const users = ref([]);
  const error = ref(null);
  const results = ref(null);

  const loadUsers = async (howMany = 5, seed = 'asd') => {
    try {
      const res = await fetch(
        `https://randomuser.me/api/?results=${howMany}&seed=${seed}`
      );

      if (!res.ok) throw Error('sth sie skiepscilo');

      results.value = await res.json();

      users.value = results.value.results;
      results.value = results.value.info;
    } catch (err) {
      error.value = err.message;
    }
  };

  return { users, error, results, loadUsers };
};

export default getUsers;
