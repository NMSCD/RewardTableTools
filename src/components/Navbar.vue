<template>
  <nav>
    <a
      href=".."
      title="Other pages"
      >&larr; View other pages</a
    >
    <a
      href="https://app.nmsassistant.com/catalogue"
      rel="noopener noreferrer"
      target="_blank"
      title="Assistant for NMS"
      >Assistant for NMS</a
    >
    <div>
      <a
        href="https://github.com/Lenni009/nms-archive"
        rel="noopener noreferrer"
        target="_blank"
        title="nms-archive"
        >NMS EXML Archive</a
      >
    </div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  flex-wrap: wrap;
  margin-block: 1rem;
  font-size: large;

  & > * {
    &:first-child {
      margin-inline-end: auto;
    }

    &:last-child {
      flex-basis: 100%;
      text-align: right;
    }
  }
}
</style>
