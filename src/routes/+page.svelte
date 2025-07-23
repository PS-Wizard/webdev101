<script lang="ts">
    import Ribbon from "$lib/components/ribbon.svelte";
    import Button from "$lib/components/Button.svelte";
    import getLatestLanding from "$lib/fetchers/landingLatest";
    import Card from "$lib/components/Card.svelte";

    let latestFromUsPromise = getLatestLanding();
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
                {#await latestFromUsPromise}
                    <div
                        class="text-center text-[1rem~4rem] h-full flex justify-center items-center flex-col"
                    >
                        <h4>(&gt;_&lt;)</h4>
                        <h3 class="text-center text-[1rem~4rem]">
                            I'm Loading As Quick As I Can <br/> pls wait.
                        </h3>
                    </div>
                {:then products}
                    <div
                        class="grid grid-cols-1 lg:grid-cols-2 gap-4 list-none"
                    >
                        {#each products as product}
                            <Card {...product} />
                        {/each}
                    </div>
                {:catch err}
                    <div
                        class="text-center text-[1rem~4rem] h-full flex justify-center items-center flex-col"
                    >
                        <h4 class="">(._.)</h4>
                        <h3 class="text-center text-[1rem~4rem]">
                            We've encountered an issue. <br />We are sorry.
                        </h3>
                    </div>
                {/await}
            </div>
        </section>
    </section>
</section>
