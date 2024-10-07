<script>
import { icons } from "../../icon-core/lib/icon-data";

export default {
    name: "Icon",
    props: {
        name: String,
        size: {
            type: String,
            default: "32px",
        },
        color: {
            type: String,
            default: "currentColor",
        },
    },
    computed: {
        path() {
            return icons.find((e) => e.name === this.name);
        },
    },
};
</script>

<template>
    <svg :class="'icon__' + name" :width="size" :height="size" viewBox="0 0 24 24" :fill="color"
        v-html="path.svg">
    </svg>
</template>