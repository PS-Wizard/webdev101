<script lang="ts">
    import type { Product } from "$lib/fetchers/landingLatest";
    import Size from "./size.svelte";

    let { images, name, price, stock, discounts, sizes }: Product = $props();
</script>

<article
    class="group w-full cursor-pointer geist uppercase border border-neutral-600 flex flex-col hover:bg-white transition-colors "
>
    <img
        src={images[0]}
        alt={name + "- img"}
        class="object-cover object-top grayscale-69 group-hover:grayscale-0 w-full h-[50vh]"
    />
    <div class="flex-1 flex flex-col gap-2 justify-between p-4">
        <h3 class="text-[1.5rem~3rem] group-hover:text-black mt-4">{name}</h3>
        <p
            class="text-[sm~lg] leading-snug text-neutral-300 group-hover:text-black normal-case max-w-4xl"
        >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti,
            ullam sit! Consectetur voluptate non, molestiae veniam ducimus
            tempora consequatur accusamus qui vel amet aliquam sit recusandae
            quo! Beatae, expedita voluptas.
        </p>
    </div>
    <div
        class="flex justify-between items-center gap-4 border-t border-neutral-600 p-4 text-[xs~md]"
    >
        <h5
            class="bg-white text-black group-hover:bg-black group-hover:text-white"
        >
            ${(price - (discounts / 100) * price).toFixed(2)}
        </h5>
        <Size {sizes} />
    </div>
</article>
