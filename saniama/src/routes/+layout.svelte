<!-- +layout.svelte -->
<script>
    import Footer from "$lib/components/Footer.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
    import "../output.css";
</script>

<main class="flex flex-col gap-4 h-screen">
    <Navbar />
    <section class="min-h-screen">
        <slot />
    </section>
    <Footer />
</main>
