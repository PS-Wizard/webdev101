import { latestFromUs } from "$lib/data/products";
import { json } from "@sveltejs/kit";

export async function GET({ params }) {
    const id = Number(params.id);
    await new Promise((resolve) => setTimeout(resolve, 4000));
    const product = latestFromUs[id]
    return json({
        product: product
    });
}
