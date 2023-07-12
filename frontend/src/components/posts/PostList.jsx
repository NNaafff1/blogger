import { Stack } from "@mui/material";
import Post from "./Post";
const posts = [
  {
    id: 1,
    user: {
      id: 1,
      username: "ahmedGham",
      image: "player.jpg",
    },
    create_at: "7/2/2023",
    text: '"Yeah, we do have Arsenal, but they got second," Paul said. "FC Barcelona got first. And quite frankly, JJ, we need winners. We need champions. We need people who win." The sports drink company was founded by Paul and KSI in 2022 and has already become one of the most popular brands in the space. They will be Barcelona\'s "Official Hydration Partner" for the next three seasons as the club looks to "expand its global network of partners" after previously partnering with PepsiCo\'s Gatorade',
    image: "/prime.webp",
  },
  {
    id: 1,
    user: {
      id: 1,
      username: "ahmedGham",
      image: "player.jpg",
    },
    create_at: "7/2/2023",
    text: '"Yeah, we do have Arsenal, but they got second," Paul said. "FC Barcelona got first. And quite frankly, JJ, we need winners. We need champions. We need people who win." The sports drink company was founded by Paul and KSI in 2022 and has already become one of the most popular brands in the space. They will be Barcelona\'s "Official Hydration Partner" for the next three seasons as the club looks to "expand its global network of partners" after previously partnering with PepsiCo\'s Gatorade',
    image: "/prime.webp",
  },
  {
    id: 1,
    user: {
      id: 1,
      username: "ahmedGham",
      image: "player.jpg",
    },
    create_at: "7/2/2023",
    text: '"Yeah, we do have Arsenal, but they got second," Paul said. "FC Barcelona got first. And quite frankly, JJ, we need winners. We need champions. We need people who win." The sports drink company was founded by Paul and KSI in 2022 and has already become one of the most popular brands in the space. They will be Barcelona\'s "Official Hydration Partner" for the next three seasons as the club looks to "expand its global network of partners" after previously partnering with PepsiCo\'s Gatorade',
    image: "/prime.webp",
  },
];

function PostList() {
  return (
    <Stack gap={5}>
      {posts.map((post) => {
        return <Post key={post.id} {...post} />;
      })}
    </Stack>
  );
}

export default PostList;
