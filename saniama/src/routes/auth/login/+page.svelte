<div class="flex w-full h-screen">
    <!-- Left Side -->
    <div class="hidden lg:block w-1/2 bg-red-400 h-full">
        <img src="" alt="" class="w-full h-full object-cover" />
    </div>

    <!-- Right Side -->
    <div class="w-full lg:w-1/2 h-full flex items-center justify-center">
        <form action="" class="h-1/2 space-y-6 p-8 rounded-2xl text-white">
            <h2 class="text-[6xl~4xl] font-semibold text-center absans ">
                Sign Up
            </h2>

            <input
                type="email"
                required
                placeholder="Email"
                class="w-full bg-neutral-900 px-4 py-2 rounded-lg border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-800"
            />

            <input
                type="password"
                required
                placeholder="Password"
                class="w-full bg-neutral-900 px-4 py-2 rounded-lg border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-800"
            />

            <button
                type="submit"
                class="w-full bg-white text-black text-sm geist font-bold tracking-tight px-4 py-2 rounded-lg border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-neutral-800 hover:bg-black hover:text-white cursor-pointer transition duration-300"
            >
                Sign Up with Email
            </button>

            <div class="relative text-center">
                <span class="text-gray-400 text-sm">or</span>
            </div>

            <div class="w-full flex justify-center items-center">
                <button
                    type="button"
                    class="flex items-center justify-center gap-2 underline bg-white text-black py-2 px-6 rounded-md border border-neutral-800 cursor-pointer"
                >
                    <img
                        src="https://www.svgrepo.com/show/475656/google-color.svg"
                        alt="Google"
                        class="w-5 h-5"
                    />
                    Sign Up with Google
                </button>
            </div>
        </form>
    </div>
</div>
