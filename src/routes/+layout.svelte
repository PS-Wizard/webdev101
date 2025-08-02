<script lang="ts">
    import favicon from "$lib/assets/favicon.svg";
    import { navigating } from "$app/state";
    import { expoInOut } from "svelte/easing";
    import { fade } from "svelte/transition";
    import "../css/output.css";
    let {
        children,
        duration = 450,
        delay = 450,
    }: {
        duration?: number;
        children: any;
        class?: string;
        delay?: number;
    } = $props();
</script>

<svelte:head>
    <link rel="icon" href={favicon} />
</svelte:head>

<a href="/another">another</a>
<a href="/">home</a>

{#key navigating.to}
    <div
        in:fade={{ delay, duration, easing: expoInOut }}
        out:fade={{ duration, easing: expoInOut }}
    >
        {@render children?.()}
    </div>
{/key}
