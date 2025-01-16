<template>
  <div class="layout-auth">
    <div class="section-img">
      <img
        class="object-cover h-screen"
        src="https://media.toyota.com.ar/6f2e2391-e0a7-4884-8e42-0f38e035bbea.jpeg"
        alt=""
      />
    </div>
    <div class="section-form">
      <RouterView></RouterView>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.layout-auth {
  @apply grid grid-cols-1;
}

.section-img {
  @apply bg-white hidden transition duration-150;
}

.section-img img {
  @apply object-cover h-screen;
}

.section-form {
  /* @apply h-screen; */
}

@media screen and (min-width: 1024px) {
  .layout-auth {
    @apply grid-cols-2;
  }
  .section-img {
    @apply block;
  }
}
</style>
