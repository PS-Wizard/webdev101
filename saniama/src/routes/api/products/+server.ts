import { latestFromUs } from "$lib/data/products";
import { json } from "@sveltejs/kit";

export async function GET() {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return json({
        products: latestFromUs
    });

}
