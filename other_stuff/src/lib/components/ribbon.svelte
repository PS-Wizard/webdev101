<script lang="ts">
    export let align: "left" | "right" = "left";
</script>

<div
    class="border-b border-neutral-600 p-2 superiormono uppercase tracking-widest leading-loose"
    class:text-left={align === "left"}
    class:text-right={align === "right"}
>
    <slot />
</div>
