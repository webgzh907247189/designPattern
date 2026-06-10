// const axios = require('axios');

// AAAAAAAAAAAAAAAAAAAAAODK9wEAAAAA7LzsNz6FLL9mOj3fHNqw75MiVc0%3DH18Be1wMKAUhnIVjETgFjBDPYrPI6dNXkcT4Wasy8xs396Dcd5
// 

// ========== 你只需要改这里 ==========
const BEARER_TOKEN = "AAAAAAAAAAAAAAAAAAAAANPK9wEAAAAAZIafAOhEtsjJRCcfiKMYQC7kUkY%3D8G77cOcS5BFH1tgIA4nVdFZzLeflR7Ry2IO9YLr0EQloUoNcii";
const USERNAME = "elonmusk"; // 目标用户名（不带@）
const CHECK_INTERVAL = 5 * 60 * 1000; // 5分钟查一次

let lastTweetId = null; // 保存上次最新推文ID
// ===================================

// 获取用户ID
async function getUserId(username) {
  const url = `https://api.twitter.com/2/users/by/username/${username}`;
//   const res = await axios.get(url, {
//     headers: { Authorization: `Bearer ${BEARER_TOKEN}` }
//   });


console.log(username, 'username')
    const res = await fetch(url, {
    headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
  })
  const data = await res.json();
  console.log(data, 'res.data')
  return res.data.data.id;
}

// 获取用户最新推文
async function getLatestTweets(userId) {
  const url = `https://api.twitter.com/2/users/${userId}/tweets`;
  const res = await axios.get(url, {
    headers: { Authorization: `Bearer ${BEARER_TOKEN}` },
    params: { max_results: 5 } // 取最新5条
  });
  return res.data.data || [];
}

// 检查是否有新推文
async function checkNewTweet() {
  try {
    const userId = await getUserId(USERNAME);
    console.log(userId)


    return
    const tweets = await getLatestTweets(userId);

    if (tweets.length === 0) {
      console.log("❌ 该用户没有发过推文");
      return;
    }

    const newestId = tweets[0].id;

    // 第一次运行：记录ID
    if (lastTweetId === null) {
      lastTweetId = newestId;
      console.log("✅ 首次启动，已记录最新推文ID");
      return;
    }

    // 判断是否有新推文
    if (newestId > lastTweetId) {
      console.log("\n🎉 发现新推文！");
      console.log("内容：" + tweets[0].text);
      lastTweetId = newestId; // 更新为最新ID
    } else {
      console.log("❌ 暂无新推文");
    }

  } catch (err) {
    console.error("请求失败：", err.response?.data || err.message);
  }
}

// 定时执行
console.log(`开始监控用户：@${USERNAME} ...`);
checkNewTweet();
setInterval(checkNewTweet, CHECK_INTERVAL);