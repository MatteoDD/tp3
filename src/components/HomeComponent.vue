<template>
  <div>
    <div class="container">
      <div class="Map"></div>
      <div class="Infos"></div>
      <div class="Trail"></div>
      <div class="Dropdown"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="css" scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 0.5fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 0px 0px;
  grid-auto-flow: row;
  grid-template-areas:
    'Trail . Infos Infos'
    'Dropdown . Map Map'
    'Dropdown . Map Map';
}

.Map {
  grid-area: Map;
}

.Infos {
  grid-area: Infos;
}

.Trail {
  grid-area: Trail;
  display: flex;
  justify-content: center;
}

.Dropdown {
  grid-area: Dropdown;
}
</style>
