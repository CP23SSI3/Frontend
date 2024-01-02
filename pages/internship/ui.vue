<template>
  <div
    x-show="open"
    x-transition:enter="transition ease-in-out duration-300 transform"
    x-transition:enter-start="translate-x-full"
    x-transition:enter-end="translate-x-0"
    x-transition:leave="transition ease-in-out duration-300 transform"
    x-transition:leave-start="translate-x-0"
    x-transition:leave-end="translate-x-full"
    x-description="Off-canvas menu, show/hide based on off-canvas menu state."
    class="relative flex flex-col w-full h-full max-w-xs py-4 pb-12 ml-auto overflow-y-auto bg-white shadow-xl"
    @click.away="open = false"
  >
    <div class="flex items-center justify-between px-4">
      <h2 class="text-lg font-medium text-gray-900">Filters</h2>
      <button
        type="button"
        class="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-white rounded-md"
        @click="open = false"
      >
        <span class="sr-only">Close menu</span>
        <svg
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>

    <!-- Filters -->
    <form class="mt-4 border-t border-gray-200">
      <h3 class="sr-only">Categories</h3>
      <ul role="list" class="px-2 py-3 font-medium text-gray-900">
        <li>
          <a href="#" class="block px-2 py-3">Totes</a>
        </li>
        <li>
          <a href="#" class="block px-2 py-3">Backpacks</a>
        </li>
        <li>
          <a href="#" class="block px-2 py-3">Travel Bags</a>
        </li>
        <li>
          <a href="#" class="block px-2 py-3">Hip Bags</a>
        </li>
        <li>
          <a href="#" class="block px-2 py-3">Laptop Sleeves</a>
        </li>
      </ul>

      <div x-data="{ open: false }" class="px-4 py-6 border-t border-gray-200">
        <h3 class="flow-root -mx-2 -my-3">
          <button
            type="button"
            x-description="Expand/collapse section button"
            class="flex items-center justify-between w-full px-2 py-3 text-gray-400 bg-white hover:text-gray-500"
            aria-controls="filter-section-mobile-0"
            @click="open = !open"
            aria-expanded="false"
            x-bind:aria-expanded="open.toString()"
          >
            <span class="font-medium text-gray-900">Color</span>
            <span class="flex items-center ml-6">
              <svg
                class="w-5 h-5"
                x-description="Expand icon, show/hide based on section open state."
                x-show="!(open)"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
                ></path>
              </svg>
              <svg
                class="w-5 h-5"
                x-description="Collapse icon, show/hide based on section open state."
                x-show="open"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                style="display: none"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          </button>
        </h3>
        <div
          class="pt-6"
          x-description="Filter section, show/hide based on section state."
          id="filter-section-mobile-0"
          x-show="open"
          style="display: none"
        >
          <div class="space-y-6">
            <div class="flex items-center">
              <input
                id="filter-mobile-color-0"
                name="color[]"
                value="white"
                type="checkbox"
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                for="filter-mobile-color-0"
                class="flex-1 min-w-0 ml-3 text-gray-500"
                >White</label
              >
            </div>
            <div class="flex items-center">
              <input
                id="filter-mobile-color-1"
                name="color[]"
                value="beige"
                type="checkbox"
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                for="filter-mobile-color-1"
                class="flex-1 min-w-0 ml-3 text-gray-500"
                >Beige</label
              >
            </div>
            <div class="flex items-center">
              <input
                id="filter-mobile-color-2"
                name="color[]"
                value="blue"
                type="checkbox"
                checked=""
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                for="filter-mobile-color-2"
                class="flex-1 min-w-0 ml-3 text-gray-500"
                >Blue</label
              >
            </div>
            <div class="flex items-center">
              <input
                id="filter-mobile-color-3"
                name="color[]"
                value="brown"
                type="checkbox"
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                for="filter-mobile-color-3"
                class="flex-1 min-w-0 ml-3 text-gray-500"
                >Brown</label
              >
            </div>
            <div class="flex items-center">
              <input
                id="filter-mobile-color-4"
                name="color[]"
                value="green"
                type="checkbox"
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                for="filter-mobile-color-4"
                class="flex-1 min-w-0 ml-3 text-gray-500"
                >Green</label
              >
            </div>
            <div class="flex items-center">
              <input
                id="filter-mobile-color-5"
                name="color[]"
                value="purple"
                type="checkbox"
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                for="filter-mobile-color-5"
                class="flex-1 min-w-0 ml-3 text-gray-500"
                >Purple</label
              >
            </div>
          </div>
        </div>
      </div>
      <div x-data="{ open: false }" class="px-4 py-6 border-t border-gray-200">
        <h3 class="flow-root -mx-2 -my-3">
          <button
            type="button"
            x-description="Expand/collapse section button"
            class="flex items-center justify-between w-full px-2 py-3 text-gray-400 bg-white hover:text-gray-500"
            aria-controls="filter-section-mobile-1"
            @click="open = !open"
            aria-expanded="false"
            x-bind:aria-expanded="open.toString()"
          >
            <span class="font-medium text-gray-900">Category</span>
            <span class="flex items-center ml-6">
              <svg
                class="w-5 h-5"
                x-description="Expand icon, show/hide based on section open state."
                x-show="!(open)"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
                ></path>
              </svg>
              <svg
                class="w-5 h-5"
                x-description="Collapse icon, show/hide based on section open state."
                x-show="open"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                style="display: none"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          </button>
        </h3>
        <div
          class="pt-6"
          x-description="Filter section, show/hide based on section state."
          id="filter-section-mobile-1"
          x-show="open"
          style="display: none"
        >
          <div class="space-y-6">
            <div class="flex items-center">
              <input
                id="filter-mobile-category-0"
                name="category[]"
                value="new-arrivals"
                type="checkbox"
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                for="filter-mobile-category-0"
                class="flex-1 min-w-0 ml-3 text-gray-500"
                >New Arrivals</label
              >
            </div>
            <div class="flex items-center">
              <input
                id="filter-mobile-category-1"
                name="category[]"
                value="sale"
                type="checkbox"
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                for="filter-mobile-category-1"
                class="flex-1 min-w-0 ml-3 text-gray-500"
                >Sale</label
              >
            </div>
            <div class="flex items-center">
              <input
                id="filter-mobile-category-2"
                name="category[]"
                value="travel"
                type="checkbox"
                checked=""
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                for="filter-mobile-category-2"
                class="flex-1 min-w-0 ml-3 text-gray-500"
                >Travel</label
              >
            </div>
            <div class="flex items-center">
              <input
                id="filter-mobile-category-3"
                name="category[]"
                value="organization"
                type="checkbox"
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                for="filter-mobile-category-3"
                class="flex-1 min-w-0 ml-3 text-gray-500"
                >Organization</label
              >
            </div>
            <div class="flex items-center">
              <input
                id="filter-mobile-category-4"
                name="category[]"
                value="accessories"
                type="checkbox"
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                for="filter-mobile-category-4"
                class="flex-1 min-w-0 ml-3 text-gray-500"
                >Accessories</label
              >
            </div>
          </div>
        </div>
      </div>
      <div x-data="{ open: false }" class="px-4 py-6 border-t border-gray-200">
        <h3 class="flow-root -mx-2 -my-3">
          <button
            type="button"
            x-description="Expand/collapse section button"
            class="flex items-center justify-between w-full px-2 py-3 text-gray-400 bg-white hover:text-gray-500"
            aria-controls="filter-section-mobile-2"
            @click="open = !open"
            aria-expanded="false"
            x-bind:aria-expanded="open.toString()"
          >
            <span class="font-medium text-gray-900">Size</span>
            <span class="flex items-center ml-6">
              <svg
                class="w-5 h-5"
                x-description="Expand icon, show/hide based on section open state."
                x-show="!(open)"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"
                ></path>
              </svg>
              <svg
                class="w-5 h-5"
                x-description="Collapse icon, show/hide based on section open state."
                x-show="open"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                style="display: none"
              >
                <path
                  fill-rule="evenodd"
                  d="M4 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H4.75A.75.75 0 014 10z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </span>
          </button>
        </h3>
        <div
          class="pt-6"
          x-description="Filter section, show/hide based on section state."
          id="filter-section-mobile-2"
          x-show="open"
          style="display: none"
        >
          <div class="space-y-6">
            <div class="flex items-center">
              <input
                id="filter-mobile-size-0"
                name="size[]"
                value="2l"
                type="checkbox"
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                for="filter-mobile-size-0"
                class="flex-1 min-w-0 ml-3 text-gray-500"
                >2L</label
              >
            </div>
            <div class="flex items-center">
              <input
                id="filter-mobile-size-1"
                name="size[]"
                value="6l"
                type="checkbox"
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                for="filter-mobile-size-1"
                class="flex-1 min-w-0 ml-3 text-gray-500"
                >6L</label
              >
            </div>
            <div class="flex items-center">
              <input
                id="filter-mobile-size-2"
                name="size[]"
                value="12l"
                type="checkbox"
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                for="filter-mobile-size-2"
                class="flex-1 min-w-0 ml-3 text-gray-500"
                >12L</label
              >
            </div>
            <div class="flex items-center">
              <input
                id="filter-mobile-size-3"
                name="size[]"
                value="18l"
                type="checkbox"
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                for="filter-mobile-size-3"
                class="flex-1 min-w-0 ml-3 text-gray-500"
                >18L</label
              >
            </div>
            <div class="flex items-center">
              <input
                id="filter-mobile-size-4"
                name="size[]"
                value="20l"
                type="checkbox"
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                for="filter-mobile-size-4"
                class="flex-1 min-w-0 ml-3 text-gray-500"
                >20L</label
              >
            </div>
            <div class="flex items-center">
              <input
                id="filter-mobile-size-5"
                name="size[]"
                value="40l"
                type="checkbox"
                checked=""
                class="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
              />
              <label
                for="filter-mobile-size-5"
                class="flex-1 min-w-0 ml-3 text-gray-500"
                >40L</label
              >
            </div>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'test'
})
</script>

<style lang="scss" scoped></style>
