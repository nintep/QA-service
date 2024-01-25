import * as qaService from "./qaService.js";

const testCourses = [
    {
        name: "Art of literature"
    },
    {
        name: "Scalable web applications"
    },
    {
        name: "Introduction to mathematics"
    },

]

const addTestData = async () => {

    console.log("=================  Adding test data to database =================");
    await qaService.clearAll();

    const c1 = await qaService.addCourse(testCourses[0]);
    const c2 = await qaService.addCourse(testCourses[1]);
    const c3 = await qaService.addCourse(testCourses[2]);

    const cId1 = c1[0].id;
    const cId2 = c2[0].id;
    const cId3 = c3[0].id;

    
    //Add questions to course 1
    await qaService.addQuestion({
        courseId: cId1,
        text: "The raven by Edgar Allan Poe",
        user: 1
    });

    await qaService.addQuestion({
        courseId: cId1,
        text: "Once upon a midnight dreary, while I pondered, weak and weary, Over many a quaint and curious volume of forgotten lore—",
        user: 1
    });
    await qaService.addQuestion({
        courseId: cId1,
        text: "While I nodded, nearly napping, suddenly there came a tapping, As of some one gently rapping, rapping at my chamber door.",
        user: 1
    });
    await qaService.addQuestion({
        courseId: cId1,
        text: '“’Tis some visitor,” I muttered, “tapping at my chamber door— Only this and nothing more.”',
        user: 1
    });
    await qaService.addQuestion({
        courseId: cId1,
        text: "Ah, distinctly I remember it was in the bleak December; And each separate dying ember wrought its ghost upon the floor.",
        user: 1
    });
    await qaService.addQuestion({
        courseId: cId1,
        text: "Eagerly I wished the morrow;—vainly I had sought to borrow From my books surcease of sorrow—sorrow for the lost Lenore—",
        user: 1
    });
    await qaService.addQuestion({
        courseId: cId1,
        text: " For the rare and radiant maiden whom the angels name Lenore— Nameless here for evermore.",
        user: 1
    });
    await qaService.addQuestion({
        courseId: cId1,
        text: "And the silken, sad, uncertain rustling of each purple curtain Thrilled me—filled me with fantastic terrors never felt before;",
        user: 1
    });
    await qaService.addQuestion({
        courseId: cId1,
        text: "So that now, to still the beating of my heart, I stood repeating “’Tis some visitor entreating entrance at my chamber door—",
        user: 1
    });
    await qaService.addQuestion({
        courseId: cId1,
        text: " Some late visitor entreating entrance at my chamber door;— This it is and nothing more.”",
        user: 1
    });
    await qaService.addQuestion({
        courseId: cId1,
        text: "Presently my soul grew stronger; hesitating then no longer, “Sir,” said I, “or Madam, truly your forgiveness I implore;",
        user: 1
    });
    await qaService.addQuestion({
        courseId: cId1,
        text: "But the fact is I was napping, and so gently you came rapping, And so faintly you came tapping, tapping at my chamber door,",
        user: 1
    });
    await qaService.addQuestion({
        courseId: cId1,
        text: " That I scarce was sure I heard you”—here I opened wide the door;— Darkness there and nothing more.",
        user: 1
    });
    await qaService.addQuestion({
        courseId: cId1,
        text: " Deep into that darkness peering, long I stood there wondering, fearing, Doubting, dreaming dreams no mortal ever dared to dream before;",
        user: 1
    });
    await qaService.addQuestion({
        courseId: cId1,
        text: "But the silence was unbroken, and the stillness gave no token, And the only word there spoken was the whispered word, “Lenore?”",
        user: 1
    });
    await qaService.addQuestion({
        courseId: cId1,
        text: "This I whispered, and an echo murmured back the word, “Lenore!”— Merely this and nothing more.",
        user: 1
    });
    await qaService.addQuestion({
        courseId: cId1,
        text: "Back into the chamber turning, all my soul within me burning, Soon again I heard a tapping somewhat louder than before.",
        user: 1
    });
    await qaService.addQuestion({
        courseId: cId1,
        text: "“Surely,” said I, “surely that is something at my window lattice; Let me see, then, what thereat is, and this mystery explore—",
        user: 1
    });
    await qaService.addQuestion({
        courseId: cId1,
        text: "Let my heart be still a moment and this mystery explore;— ’Tis the wind and nothing more!”",
        user: 1
    });
    await qaService.addQuestion({
        courseId: cId1,
        text: "Open here I flung the shutter, when, with many a flirt and flutter, In there stepped a stately Raven of the saintly days of yore;",
        user: 1
    });
    await qaService.addQuestion({
        courseId: cId1,
        text: "Not the least obeisance made he; not a minute stopped or stayed he; But, with mien of lord or lady, perched above my chamber door—",
        user: 1
    });
    await qaService.addQuestion({
        courseId: cId1,
        text: " Perched upon a bust of Pallas just above my chamber door— Perched, and sat, and nothing more.",
        user: 1
    });

    //Add question with answers to course 2

    const q1 = await qaService.addQuestion({
        courseId: cId2,
        text: "My playwright tests all fail all the time and I have no idea why. Pls help!",
        user: 1
    });

    const qId1 = q1[0].id;

    await qaService.addAnswer({
        questionId: qId1,
        text: "Lorem ipsum dolor sit amet. Non omnis nihil qui assumenda consectetur et neque dolorem non dolor nisi ut asperiores velit in tempore repudiandae et placeat velit. Non rerum voluptate nam dolorem consequatur ad autem saepe in minus quia est ipsam quos et nesciunt rerum. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Eum dolorum animi quo maxime laboriosam eos quod quia! Et beatae corrupti ut aperiam autem 33 quod numquam ut nesciunt animi aut neque veniam ab provident omnis?",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et sint veritatis in aliquid impedit qui delectus doloremque a enim commodi ut eius amet. Qui velit velit nam incidunt perferendis ab rerum molestias non doloribus enim sed ipsam sunt. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et mollitia error et neque modi qui ipsa incidunt non eius adipisci ab maxime cumque eum consectetur laudantium! At recusandae iure quo mollitia odit eos reprehenderit nostrum At nisi aspernatur cum quis labore.",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Aut culpa quia et voluptas dolor sed obcaecati repellendus ea quasi beatae et laudantium nihil. Est perspiciatis enim non aspernatur dignissimos ad repellendus maiores et nobis eligendi et ducimus voluptas. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Lorem ipsum dolor sit amet. Non omnis nihil qui assumenda consectetur et neque dolorem non dolor nisi ut asperiores velit in tempore repudiandae et placeat velit. Non rerum voluptate nam dolorem consequatur ad autem saepe in minus quia est ipsam quos et nesciunt rerum. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Eum dolorum animi quo maxime laboriosam eos quod quia! Et beatae corrupti ut aperiam autem 33 quod numquam ut nesciunt animi aut neque veniam ab provident omnis?",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et sint veritatis in aliquid impedit qui delectus doloremque a enim commodi ut eius amet. Qui velit velit nam incidunt perferendis ab rerum molestias non doloribus enim sed ipsam sunt. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et mollitia error et neque modi qui ipsa incidunt non eius adipisci ab maxime cumque eum consectetur laudantium! At recusandae iure quo mollitia odit eos reprehenderit nostrum At nisi aspernatur cum quis labore.",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Aut culpa quia et voluptas dolor sed obcaecati repellendus ea quasi beatae et laudantium nihil. Est perspiciatis enim non aspernatur dignissimos ad repellendus maiores et nobis eligendi et ducimus voluptas. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Lorem ipsum dolor sit amet. Non omnis nihil qui assumenda consectetur et neque dolorem non dolor nisi ut asperiores velit in tempore repudiandae et placeat velit. Non rerum voluptate nam dolorem consequatur ad autem saepe in minus quia est ipsam quos et nesciunt rerum. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Eum dolorum animi quo maxime laboriosam eos quod quia! Et beatae corrupti ut aperiam autem 33 quod numquam ut nesciunt animi aut neque veniam ab provident omnis?",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et sint veritatis in aliquid impedit qui delectus doloremque a enim commodi ut eius amet. Qui velit velit nam incidunt perferendis ab rerum molestias non doloribus enim sed ipsam sunt. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et mollitia error et neque modi qui ipsa incidunt non eius adipisci ab maxime cumque eum consectetur laudantium! At recusandae iure quo mollitia odit eos reprehenderit nostrum At nisi aspernatur cum quis labore.",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Aut culpa quia et voluptas dolor sed obcaecati repellendus ea quasi beatae et laudantium nihil. Est perspiciatis enim non aspernatur dignissimos ad repellendus maiores et nobis eligendi et ducimus voluptas. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Lorem ipsum dolor sit amet. Non omnis nihil qui assumenda consectetur et neque dolorem non dolor nisi ut asperiores velit in tempore repudiandae et placeat velit. Non rerum voluptate nam dolorem consequatur ad autem saepe in minus quia est ipsam quos et nesciunt rerum. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Eum dolorum animi quo maxime laboriosam eos quod quia! Et beatae corrupti ut aperiam autem 33 quod numquam ut nesciunt animi aut neque veniam ab provident omnis?",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et sint veritatis in aliquid impedit qui delectus doloremque a enim commodi ut eius amet. Qui velit velit nam incidunt perferendis ab rerum molestias non doloribus enim sed ipsam sunt. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et mollitia error et neque modi qui ipsa incidunt non eius adipisci ab maxime cumque eum consectetur laudantium! At recusandae iure quo mollitia odit eos reprehenderit nostrum At nisi aspernatur cum quis labore.",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Aut culpa quia et voluptas dolor sed obcaecati repellendus ea quasi beatae et laudantium nihil. Est perspiciatis enim non aspernatur dignissimos ad repellendus maiores et nobis eligendi et ducimus voluptas. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Lorem ipsum dolor sit amet. Non omnis nihil qui assumenda consectetur et neque dolorem non dolor nisi ut asperiores velit in tempore repudiandae et placeat velit. Non rerum voluptate nam dolorem consequatur ad autem saepe in minus quia est ipsam quos et nesciunt rerum. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Eum dolorum animi quo maxime laboriosam eos quod quia! Et beatae corrupti ut aperiam autem 33 quod numquam ut nesciunt animi aut neque veniam ab provident omnis?",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et sint veritatis in aliquid impedit qui delectus doloremque a enim commodi ut eius amet. Qui velit velit nam incidunt perferendis ab rerum molestias non doloribus enim sed ipsam sunt. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et mollitia error et neque modi qui ipsa incidunt non eius adipisci ab maxime cumque eum consectetur laudantium! At recusandae iure quo mollitia odit eos reprehenderit nostrum At nisi aspernatur cum quis labore.",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Aut culpa quia et voluptas dolor sed obcaecati repellendus ea quasi beatae et laudantium nihil. Est perspiciatis enim non aspernatur dignissimos ad repellendus maiores et nobis eligendi et ducimus voluptas. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Lorem ipsum dolor sit amet. Non omnis nihil qui assumenda consectetur et neque dolorem non dolor nisi ut asperiores velit in tempore repudiandae et placeat velit. Non rerum voluptate nam dolorem consequatur ad autem saepe in minus quia est ipsam quos et nesciunt rerum. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Eum dolorum animi quo maxime laboriosam eos quod quia! Et beatae corrupti ut aperiam autem 33 quod numquam ut nesciunt animi aut neque veniam ab provident omnis?",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et sint veritatis in aliquid impedit qui delectus doloremque a enim commodi ut eius amet. Qui velit velit nam incidunt perferendis ab rerum molestias non doloribus enim sed ipsam sunt. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et mollitia error et neque modi qui ipsa incidunt non eius adipisci ab maxime cumque eum consectetur laudantium! At recusandae iure quo mollitia odit eos reprehenderit nostrum At nisi aspernatur cum quis labore.",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Aut culpa quia et voluptas dolor sed obcaecati repellendus ea quasi beatae et laudantium nihil. Est perspiciatis enim non aspernatur dignissimos ad repellendus maiores et nobis eligendi et ducimus voluptas. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Lorem ipsum dolor sit amet. Non omnis nihil qui assumenda consectetur et neque dolorem non dolor nisi ut asperiores velit in tempore repudiandae et placeat velit. Non rerum voluptate nam dolorem consequatur ad autem saepe in minus quia est ipsam quos et nesciunt rerum. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Eum dolorum animi quo maxime laboriosam eos quod quia! Et beatae corrupti ut aperiam autem 33 quod numquam ut nesciunt animi aut neque veniam ab provident omnis?",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et sint veritatis in aliquid impedit qui delectus doloremque a enim commodi ut eius amet. Qui velit velit nam incidunt perferendis ab rerum molestias non doloribus enim sed ipsam sunt. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et mollitia error et neque modi qui ipsa incidunt non eius adipisci ab maxime cumque eum consectetur laudantium! At recusandae iure quo mollitia odit eos reprehenderit nostrum At nisi aspernatur cum quis labore.",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Aut culpa quia et voluptas dolor sed obcaecati repellendus ea quasi beatae et laudantium nihil. Est perspiciatis enim non aspernatur dignissimos ad repellendus maiores et nobis eligendi et ducimus voluptas. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Lorem ipsum dolor sit amet. Non omnis nihil qui assumenda consectetur et neque dolorem non dolor nisi ut asperiores velit in tempore repudiandae et placeat velit. Non rerum voluptate nam dolorem consequatur ad autem saepe in minus quia est ipsam quos et nesciunt rerum. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Eum dolorum animi quo maxime laboriosam eos quod quia! Et beatae corrupti ut aperiam autem 33 quod numquam ut nesciunt animi aut neque veniam ab provident omnis?",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et sint veritatis in aliquid impedit qui delectus doloremque a enim commodi ut eius amet. Qui velit velit nam incidunt perferendis ab rerum molestias non doloribus enim sed ipsam sunt. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et mollitia error et neque modi qui ipsa incidunt non eius adipisci ab maxime cumque eum consectetur laudantium! At recusandae iure quo mollitia odit eos reprehenderit nostrum At nisi aspernatur cum quis labore.",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Aut culpa quia et voluptas dolor sed obcaecati repellendus ea quasi beatae et laudantium nihil. Est perspiciatis enim non aspernatur dignissimos ad repellendus maiores et nobis eligendi et ducimus voluptas. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Lorem ipsum dolor sit amet. Non omnis nihil qui assumenda consectetur et neque dolorem non dolor nisi ut asperiores velit in tempore repudiandae et placeat velit. Non rerum voluptate nam dolorem consequatur ad autem saepe in minus quia est ipsam quos et nesciunt rerum. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Eum dolorum animi quo maxime laboriosam eos quod quia! Et beatae corrupti ut aperiam autem 33 quod numquam ut nesciunt animi aut neque veniam ab provident omnis?",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et sint veritatis in aliquid impedit qui delectus doloremque a enim commodi ut eius amet. Qui velit velit nam incidunt perferendis ab rerum molestias non doloribus enim sed ipsam sunt. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et mollitia error et neque modi qui ipsa incidunt non eius adipisci ab maxime cumque eum consectetur laudantium! At recusandae iure quo mollitia odit eos reprehenderit nostrum At nisi aspernatur cum quis labore.",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Aut culpa quia et voluptas dolor sed obcaecati repellendus ea quasi beatae et laudantium nihil. Est perspiciatis enim non aspernatur dignissimos ad repellendus maiores et nobis eligendi et ducimus voluptas. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Lorem ipsum dolor sit amet. Non omnis nihil qui assumenda consectetur et neque dolorem non dolor nisi ut asperiores velit in tempore repudiandae et placeat velit. Non rerum voluptate nam dolorem consequatur ad autem saepe in minus quia est ipsam quos et nesciunt rerum. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Eum dolorum animi quo maxime laboriosam eos quod quia! Et beatae corrupti ut aperiam autem 33 quod numquam ut nesciunt animi aut neque veniam ab provident omnis?",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et sint veritatis in aliquid impedit qui delectus doloremque a enim commodi ut eius amet. Qui velit velit nam incidunt perferendis ab rerum molestias non doloribus enim sed ipsam sunt. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et mollitia error et neque modi qui ipsa incidunt non eius adipisci ab maxime cumque eum consectetur laudantium! At recusandae iure quo mollitia odit eos reprehenderit nostrum At nisi aspernatur cum quis labore.",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Aut culpa quia et voluptas dolor sed obcaecati repellendus ea quasi beatae et laudantium nihil. Est perspiciatis enim non aspernatur dignissimos ad repellendus maiores et nobis eligendi et ducimus voluptas. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Lorem ipsum dolor sit amet. Non omnis nihil qui assumenda consectetur et neque dolorem non dolor nisi ut asperiores velit in tempore repudiandae et placeat velit. Non rerum voluptate nam dolorem consequatur ad autem saepe in minus quia est ipsam quos et nesciunt rerum. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Eum dolorum animi quo maxime laboriosam eos quod quia! Et beatae corrupti ut aperiam autem 33 quod numquam ut nesciunt animi aut neque veniam ab provident omnis?",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et sint veritatis in aliquid impedit qui delectus doloremque a enim commodi ut eius amet. Qui velit velit nam incidunt perferendis ab rerum molestias non doloribus enim sed ipsam sunt. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et mollitia error et neque modi qui ipsa incidunt non eius adipisci ab maxime cumque eum consectetur laudantium! At recusandae iure quo mollitia odit eos reprehenderit nostrum At nisi aspernatur cum quis labore.",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Aut culpa quia et voluptas dolor sed obcaecati repellendus ea quasi beatae et laudantium nihil. Est perspiciatis enim non aspernatur dignissimos ad repellendus maiores et nobis eligendi et ducimus voluptas. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Lorem ipsum dolor sit amet. Non omnis nihil qui assumenda consectetur et neque dolorem non dolor nisi ut asperiores velit in tempore repudiandae et placeat velit. Non rerum voluptate nam dolorem consequatur ad autem saepe in minus quia est ipsam quos et nesciunt rerum. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Eum dolorum animi quo maxime laboriosam eos quod quia! Et beatae corrupti ut aperiam autem 33 quod numquam ut nesciunt animi aut neque veniam ab provident omnis?",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et sint veritatis in aliquid impedit qui delectus doloremque a enim commodi ut eius amet. Qui velit velit nam incidunt perferendis ab rerum molestias non doloribus enim sed ipsam sunt. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et mollitia error et neque modi qui ipsa incidunt non eius adipisci ab maxime cumque eum consectetur laudantium! At recusandae iure quo mollitia odit eos reprehenderit nostrum At nisi aspernatur cum quis labore.",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Aut culpa quia et voluptas dolor sed obcaecati repellendus ea quasi beatae et laudantium nihil. Est perspiciatis enim non aspernatur dignissimos ad repellendus maiores et nobis eligendi et ducimus voluptas. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Lorem ipsum dolor sit amet. Non omnis nihil qui assumenda consectetur et neque dolorem non dolor nisi ut asperiores velit in tempore repudiandae et placeat velit. Non rerum voluptate nam dolorem consequatur ad autem saepe in minus quia est ipsam quos et nesciunt rerum. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Eum dolorum animi quo maxime laboriosam eos quod quia! Et beatae corrupti ut aperiam autem 33 quod numquam ut nesciunt animi aut neque veniam ab provident omnis?",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et sint veritatis in aliquid impedit qui delectus doloremque a enim commodi ut eius amet. Qui velit velit nam incidunt perferendis ab rerum molestias non doloribus enim sed ipsam sunt. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et mollitia error et neque modi qui ipsa incidunt non eius adipisci ab maxime cumque eum consectetur laudantium! At recusandae iure quo mollitia odit eos reprehenderit nostrum At nisi aspernatur cum quis labore.",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Aut culpa quia et voluptas dolor sed obcaecati repellendus ea quasi beatae et laudantium nihil. Est perspiciatis enim non aspernatur dignissimos ad repellendus maiores et nobis eligendi et ducimus voluptas. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Lorem ipsum dolor sit amet. Non omnis nihil qui assumenda consectetur et neque dolorem non dolor nisi ut asperiores velit in tempore repudiandae et placeat velit. Non rerum voluptate nam dolorem consequatur ad autem saepe in minus quia est ipsam quos et nesciunt rerum. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Eum dolorum animi quo maxime laboriosam eos quod quia! Et beatae corrupti ut aperiam autem 33 quod numquam ut nesciunt animi aut neque veniam ab provident omnis?",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et sint veritatis in aliquid impedit qui delectus doloremque a enim commodi ut eius amet. Qui velit velit nam incidunt perferendis ab rerum molestias non doloribus enim sed ipsam sunt. ",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Et mollitia error et neque modi qui ipsa incidunt non eius adipisci ab maxime cumque eum consectetur laudantium! At recusandae iure quo mollitia odit eos reprehenderit nostrum At nisi aspernatur cum quis labore.",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Aut culpa quia et voluptas dolor sed obcaecati repellendus ea quasi beatae et laudantium nihil. Est perspiciatis enim non aspernatur dignissimos ad repellendus maiores et nobis eligendi et ducimus voluptas. ",
        user: 2
    });

    await qaService.addAnswer({
        questionId: qId1,
        text: "You could remove Docker images and volumes and try rebuilding the container.",
        user: 2
    });
    await qaService.addAnswer({
        questionId: qId1,
        text: "Did you put the right URL in the config file?",
        user: 2
    });

    console.log("============================  Finished adding test data");

}

export { addTestData } 