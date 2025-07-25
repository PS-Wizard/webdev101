<script lang="ts">
    import "../app.css";
    import { afterNavigate, beforeNavigate } from "$app/navigation";
    import gsap from "gsap";

    let { children } = $props();
    let overlay: HTMLElement;

    beforeNavigate(() => {
        console.log("Starting navigating");
        gsap.globalTimeline.clear();
        gsap.fromTo(
            overlay,
            { y: "-100vh" },
            {
                y: "0",
                duration: 0.69,
                ease: "expo.in",
            },
        );
    });

    afterNavigate(() => {
        console.log("ended navigating");
        gsap.globalTimeline.clear();
        gsap.fromTo(
            overlay,
            { y: "0" },
            {
                y: "-100vh",
                duration: 0.69,
                ease: "expo.inOut",
            },
        );
    });
</script>

<div class="full-overlay" bind:this={overlay}></div>
<nav>
    <a href="/animation/">To A</a>
    <a href="/animation/about/">To B</a>
</nav>
{@render children()}
