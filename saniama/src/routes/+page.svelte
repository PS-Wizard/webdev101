<script lang="ts">
    import Ribbon from "$lib/components/ribbon.svelte";
    import Button from "$lib/components/Button.svelte";
    import Card from "$lib/components/Card.svelte";
    import { onMount } from "svelte";
    import type { Product } from "$lib/data/products";
    let data: { products: Product[] } | null = $state(null);
    let error: string | null = $state(null);
    onMount(async () => {
        try {
            const response = await fetch("/api/products/");
            if (!response.ok) throw new Error("Server Said Nuh Uh");
            data = await response.json();
        } catch (err: any) {
            error = err.message || "Some thing went wrong";
        }
    });
</script>

<section class="">
    <section
        class="flex justify-center items-center flex-col h-[80vh] absans antialiased border-b border-neutral-600"
    >
        <h1 class="text-[3rem~10rem]">Saniama</h1>
        <p class="max-w-4xl text-center text-[xs~xl] px-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
            placeat illum? Recusandae laborum dolorem quasi unde placeat. Sed,
            ducimus ad!
        </p>
        <div class="m-8">
            <Button variant="outline">Explore Our Collection</Button>
        </div>
    </section>
    <section class="flex gap-4 flex-col">
        <Ribbon align="right">Latest From Us</Ribbon>
        <section
            class="min-h-screen flex flex-col gap-4 justify-center items-center"
        >
            <div>
                {#if error}
                    <div
                        class="text-center text-[1rem~4rem] h-full flex justify-center items-center flex-col"
                    >
                        <h4 class="">(._.)</h4>
                        <h3
                            class="text-center text-[1rem~4rem] text-neutral-400"
                        >
                            {error}
                        </h3>
                    </div>
                {:else if data?.products?.length}
                    <div
                        class="grid grid-cols-1 lg:grid-cols-2 gap-4 list-none"
                    >
                        {#each data?.products ?? [] as product}
                            <Card {...product} />
                        {/each}
                    </div>
                {:else}
                    <div
                        class="text-center text-[1rem~4rem] h-full flex justify-center items-center flex-col"
                    >
                        <h4>(&gt;_&lt;)</h4>
                        <h3 class="text-center text-[1rem~4rem]">
                            I'm Loading As Quick As I Can <br /> pls wait.
                        </h3>
                    </div>
                {/if}
            </div>
        </section>
    </section>
</section>
