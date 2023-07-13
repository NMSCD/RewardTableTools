<template>
	<span class="tooltip" tabindex="0">
		<i class="material-icons help-icon">help</i>
		<span class="tooltiptext">
			<slot></slot>
		</span>
	</span>
</template>

<style scoped lang="scss">
.tooltip {
	position: relative;
	margin-block-start: 2px;

	.tooltiptext {
		--width: 230px;
		--bg: #555;
		visibility: hidden;
		width: var(--width);
		background-color: var(--bg);
		color: #fff;
		text-align: center;
		border-radius: 6px;
		padding: 5px 3px;
		position: absolute;
		z-index: 1;
		bottom: 125%;
		left: 50%;
		margin-left: calc(var(--width) * -0.5);
		opacity: 0;
		transition: opacity 0.3s;
		font-weight: normal;
		font-family: Roboto, sans-serif;

		&::after {
			content: "";
			position: absolute;
			top: 100%;
			left: 50%;
			margin-left: -5px;
			border-width: 5px;
			border-style: solid;
			border-color: transparent;
			border-top-color: var(--bg);
		}
	}

	&:hover,
	&:active,
	&:focus-visible {
		.tooltiptext {
			visibility: visible;
			opacity: 1;
		}
	}

	.help-icon {
		font-size: 1rem;
		cursor: default;
	}
}
</style>