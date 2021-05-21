This repository consists the codebase for a simple crypto portfolio manager that lists top 100 cryptocurrencies by Market cap. You can edit the number of coins you hold and check your portfolio's value.

You can try it live at https://mudrex.adithyabhat.com

https://user-images.githubusercontent.com/20818481/119133236-49538c80-ba59-11eb-80ff-f3d414d45da7.mp4

## Installation

### 1. Pre-requisites

- Node.js runtime (>14.x preferred)
- A Package Manager (Node/Yarn/PNPM)

### 2. Development Environment Setup

**Client**

- Clone this repo `git clone [https://github.com/AdithyaBhat17/crypto-portfolio-manager](https://github.com/AdithyaBhat17/crypto-manager-proxy)`
- Open the .env file and edit the `REACT_APP_API_URL` value to match the URL of your proxy server (Learn how to set up a proxy server below).
- Start the development server using `yarn start`

**Server**

- Clone [https://github.com/AdithyaBhat17/crypto-manager-proxy](https://github.com/AdithyaBhat17/crypto-manager-proxy)
- Login to [https://pro.coinmarketcap.com/api/v1](https://pro.coinmarketcap.com/api/v1) and copy your API Key.
- Paste your API Key in `crypto-manager-proxy/.env`
- Run `yarn start` to get the proxy server up and running.

## State management

I follow this idea of keeping the application and server (Data from external sources) state separate.

I've used React hooks to manage local state and SWR to manage server state. SWR provides a better user experience by showing stale data to the users and fetching the latest data in the background. If the newly fetched data is different from the cached data, the cache is flushed and replaced with this newly fetched data. SWR also allows us to show the latest data possible when users switch to a different tab and return to the application. (Check out [https://swr.now.sh](https://swr.now.sh/) for more details.)

![mudrex-state-management](https://user-images.githubusercontent.com/20818481/119126435-a8f96a00-ba50-11eb-9b37-20d73d550ed6.png)


## Libraries Used

1. [React](http://reactjs.org)
2. [Chakra UI](http://chakra-ui.com)
3. [Lottie Files](https://lottiefiles.com/)
4. [SWR](http://swr.vercel.app)
5. [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
6. [Mock Service Workers](https://mswjs.io/) (For unit tests only)

## Code Coverage Report

![CleanShot 2021-05-21 at 14 14 57@2x](https://user-images.githubusercontent.com/20818481/119133693-d1d22d00-ba59-11eb-83f8-be14b376f0db.png)

## Deployments

![image](https://user-images.githubusercontent.com/20818481/119133580-b2d39b00-ba59-11eb-93ae-86de13afc899.png)
