<template>
  <div id="shopping">
    <AppNavbar />
    <main
      role="main"
      class="mt-5 bg-white"
    >
      <router-view />
    </main>
  </div>
</template>

<script>
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import AppNavbar from './components/AppNavbar'

export default {
  components: {
    AppNavbar
  }
}
</script>