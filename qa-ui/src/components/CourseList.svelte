<script>
    const fetchCourses = async () => {
        const response = await fetch("api/courses");
        return await response.json();
    };

    let coursesPromise = fetchCourses();
</script>

<div class="mx-8">
    <h1 class="text-4xl text-gray-700 font-serif font-medium my-8">
        Available courses
    </h1>
    {#await coursesPromise}
        <p>Loading courses...</p>
    {:then courses}
        {#if courses.length === 0}
            <p>No courses found</p>{:else}
            <ul>
                {#each courses as course}
                    <li class="my-2 text-lg underline">
                        <a href="/courses/{course.id}">{course.name}</a>
                    </li>
                {/each}
            </ul>
        {/if}
    {/await}
</div>
