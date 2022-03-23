<template>
  <div class="user">
    <div class="user__name username">
      <div class="username__first">{{ user.name.first }}</div>
      <div class="username__last">{{ user.name.last }}</div>
      <div
        class="username__verify"
        :class="{ 'username__verify--verified': verified }"
        @click="handleVerify"
      ></div>
    </div>
    <div class="user__details">
      <div class="user__photo">
        <img :src="user.picture.large" />
      </div>
      <div class="user__info">
        <div class="user__email">{{ user.email }}</div>

        <div class="user__more" v-if="show">
          <div class="user__address">
            {{ user.location.postcode }} {{ user.location.city }},
            {{ user.location.street.name }} {{ user.location.street.number }}
          </div>
          <div class="user__country">
            {{ user.location.country }}, {{ user.location.state }}
          </div>
          <div class="user__birth">{{ dateFormat(user.dob.date) }}</div>
          <div class="user__registered">
            {{ dateFormat(user.registered.date, true) }}
          </div>
        </div>
      </div>
    </div>
    <div class="user__buttons">
      <button @click="showMore">{{ buttonMoreLabel }}</button>
      <button @click="handleVerify">{{ buttonVerifyLabel }}</button>
    </div>
  </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { computed, onMounted } from '@vue/runtime-core';
export default {
  props: ['user'],
  setup(props) {
    const verified = ref(false);
    const handleVerify = () => {
      verified.value = !verified.value;
      if (verified.value) {
        localStorage.setItem(
          props.user.login.uuid,
          JSON.stringify(props.user.login.uuid)
        );
      }
      if (!verified.value) {
        if (!localStorage.getItem(props.user.login.uuid)) return;
        localStorage.removeItem(props.user.login.uuid);
      }
    };

    const show = ref(false);
    const showMore = () => {
      show.value = !show.value;
    };
    const buttonMoreLabel = computed(() => (show.value ? 'HIDE' : 'SHOW'));
    const buttonVerifyLabel = computed(() =>
      verified.value ? 'Unverify' : 'Verify'
    );

    const dateFormat = (date, full = false) => {
      if (!full) return new Intl.DateTimeFormat('pl-PL').format(new Date(date));
      return new Intl.DateTimeFormat('pl-PL', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }).format(new Date(date));
    };

    onMounted(() => {
      if (!localStorage.getItem(props.user.login.uuid)) return;
      verified.value = true;
    });

    return {
      show,
      showMore,
      buttonMoreLabel,
      verified,
      handleVerify,
      buttonVerifyLabel,
      dateFormat,
    };
  },
};
</script>

<style lang="scss">
.user {
  border: 2px solid var(--bg-color);
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.5);
  border-radius: 10px;
  height: 25rem;
  width: 100%;
  max-width: 60rem;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  &__details {
    width: 100%;
    height: 15rem;
    padding: 2rem;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    gap: 3rem;
  }
  &__photo {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    overflow: hidden;
    object-fit: cover;
  }
  &__buttons {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 2rem;
    margin-bottom: 2rem;

    button {
      border: 2px solid var(--bg-color);
      font-size: 1rem;
      width: 10rem;
      height: 3rem;
      border-radius: 0.5rem;
      text-align: center;
      text-transform: uppercase;
      cursor: pointer;
      color: white;
      background-color: var(--bg-color);
      display: inline-block;
      transition: all 0.3s ease-out;
      box-shadow: 0 0.3rem 0.5rem rgba(0, 0, 0, 0.5);

      &:hover {
        color: var(--bg-color);
        background-color: white;
        transform: translateY(-1px);
      }

      &:active {
        transform: translateY(3px);
        box-shadow: 0 0.2rem 0.3rem rgba(0, 0, 0, 0.5);
      }
    }
  }
  &__info {
    align-content: flex-start;
    height: 10rem;
  }
  &__info,
  &__more {
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: flex-start;
  }
  &__more {
    margin-top: 1rem;
    font-size: 1.2rem;
  }
}

.username {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4rem;
  width: 100%;
  background-color: var(--bg-color);
  color: #fff;
  font-weight: bold;
  font-size: 1.8rem;
  gap: 1rem;
  text-transform: uppercase;
  margin-bottom: auto;
  position: relative;
  &__verify {
    position: absolute;
    right: 1rem;
    width: 2rem;
    height: 2rem;
    background-color: red;
    border-radius: 50%;
    display: block;
    box-shadow: 0 0.2rem 0.3rem rgba(0, 0, 0, 0.5);
    cursor: pointer;

    &--verified {
      background-color: greenyellow;
    }
  }
}
</style>
