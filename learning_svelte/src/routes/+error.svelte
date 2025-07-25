<script>
    import { page } from "$app/state";
</script>

<h1>{page.status} {page.error.message}</h1>
<span style="font-size: 10em"> This fancy error</span>
