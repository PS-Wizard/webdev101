<script lang="ts">
    export let variant: "outline" | "filled" = "outline";
</script>

<button
    class={`px-8 py-4 rounded-full cursor-pointer transition-colors duration-200 ease-in-out
    ${
        variant === "outline"
            ? "border border-neutral-300 bg-transparent text-white hover:bg-white hover:text-black"
            : "border border-neutral-300 bg-white text-black hover:bg-transparent hover:text-white"
    }`}
>
    <slot />
</button>
