## Getting Started

Install dependencies.

Use `18.19.0` for `node` version, and `10.2.3` for `npm` version.
To install and manage node versions you can install [nvm](https://github.com/nvm-sh/nvm)

`npm install`

Then, run the development server:

```npm run dev```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Project Structure

### Project folders

| Path          | Description                           |
|---------------|---------------------------------------|
| `assets/`     | Code importable assets                |
| `components/` | React abstract components folder      |
| `public/`     | Public folder (not compilable assets) |
| `types/`      | Global Typescript types               |
| `utils/`      | Small usefull globally used utilities |

## External libraries

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [TypeScript](https://www.typescriptlang.org/)
- [ESLint](https://eslint.org/)
- [Prettier](https://prettier.io/)
- [Tailwind CSS](https://tailwindcss.com/)


## Linting

This project uses [ESLint](https://eslint.org/) and [Prettier](https://prettier.io/) for linting. To run the linter, use the following command:
```npm run lint```

## Tests

This project uses [Vitest](https://vitest.dev/) for testing. To run the tests, use the following command:
```npm run test```
For test files using `__tests__` folder. 

For mock API requests using [MSW](https://mswjs.io/).