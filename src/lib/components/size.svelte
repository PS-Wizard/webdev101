<script lang="ts">
    let { sizes }: { sizes: number[] } = $props();

    const sizeMap: Record<string, string> = {
        "1": "SM",
        "2": "MD",
        "3": "LG",
        "4": "XL",
        "5": "XXL",
    };

    const sizeLabels = sizes.map((num) => sizeMap[num.toString()] ?? "Unknown");
</script>

<p class="group-hover:bg-black group-hover:text-white bg-white text-black">
    {sizeLabels.join(" | ")}
</p>
