<template>
	<h2 class="title is-4 section-header">	<!-- //NOSONAR this is fine, the other components have the h1-->
		<slot></slot>
	</h2>
</template>

<style scoped lang="scss">
.section-header {
	padding-bottom: 5px;
	border-bottom: 1px solid lightgrey;
}
</style>