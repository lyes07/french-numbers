<div id="sticky-header">
	<header class="bg-white dark:bg-gray-900">
		<div class="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<div class="flex-1 md:flex md:items-center md:gap-12">
					<a class="block text-teal-600 dark:text-teal-300" href="/">
						<span class="sr-only">Home</span>
						<img class="h-11" src="/logo.png" alt="12 learn numbers logo" />
					</a>
				</div>

				<div class="md:flex md:items-center md:gap-12">
					<nav aria-label="Global" class="hidden md:block">
						<ul class="flex items-center gap-6 text-sm">
							<li>
								<a
									class="text-gray-500 transition hover:text-gray-500/75 dark:text-white dark:hover:text-white/75"
									href="/"
								>
									About
								</a>
							</li>
							<li>
								<div>
									<select
										name="HeadlineAct"
										id="HeadlineAct"
										class="mt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
									>
										<option value="">Select Language</option>
										<option value="AR">Arabic</option>
										<option value="FR">French</option>
										<option value="EN">English</option>
									</select>
								</div>
							</li>
						</ul>
					</nav>

					<div class="flex items-center gap-4">
						<div class="sm:flex sm:gap-4">
							<div class="hidden sm:flex">
								<a
									class="rounded-md bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow dark:hover:bg-teal-500"
									href="/"
								>
									Buy Me Coffie
								</a>
							</div>
						</div>

						<div class="block md:hidden">
							<button
								class="rounded bg-gray-100 p-2 text-gray-600 transition hover:text-gray-600/75 dark:bg-gray-800 dark:text-white dark:hover:text-white/75"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									class="h-5 w-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
									stroke-width="2"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M4 6h16M4 12h16M4 18h16"
									/>
								</svg>
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	</header>
</div>

<style>
	#sticky-header {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 1000;
		background-color: #fff; /* Set background color */
		/* Add any other styling as needed */
	}
</style>
