<script>
  import { userUuid } from "../stores/stores.js";
</script>

<nav class="p-4 mb-4 shadow bg-emerald-300">
  <div class="flex flex-row text-base">
    <div class="basis-1/6"><a href="/">All courses</a></div>
    <span class="basis-5/6 pl-2 text-right">Logged in as {$userUuid}</span>
  </div>
</nav>
