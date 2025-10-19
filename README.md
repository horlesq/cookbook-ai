# CookbookAI

A full-stack web application that uses AI to generate personalized recipes based on user descriptions. Users can search for meal ideas, view detailed recipes with ingredients and instructions, and save their favorite recipes for later. The project features a responsive design with a modern UI and seamless user experience across all devices.

<img width="1363" height="1075" alt="cookbook-ai-delta vercel app_" src="https://github.com/user-attachments/assets/14657d4a-3a78-43d2-98d2-d20c46a9d8a2" />
<img width="1363" height="1599" alt="cookbook-ai-delta vercel app_ (1)" src="https://github.com/user-attachments/assets/3f2b7ab1-943e-4403-97d5-c71250b62cfa" />


## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [Technologies](#technologies)
- [Installation](#installation)
- [License](#license)
- [Contact](#contact)

## Features

- **AI Recipe Generation**: Generate food recipes using AI based on your ingredients
- **Favorite Recipes**: Save and manage your favorite recipes
- **User Authentication**: Secure sign-in and registration
- **Search Functionality**: Find recipes based on what you have
- **Responsive Design**: Works perfectly on all devices

## Usage

- **Search for Recipes**: Use the search bar to describe what you want to eat
- **Browse Suggestions**: View AI-generated recipe suggestions
- **Save Favorites**: Create an account to save your favorite recipes
- **View Details**: Click on any recipe to see ingredients and instructions

## Technologies

- **Next.js** - React framework with App Router
- **Tailwind CSS** - Styling
- **NextAuth.js** - Authentication
- **MongoDB** - Database with Mongoose ODM
- **Groq API** - AI recipe generation

## Installation

To get started with this project, follow these steps:

1. **Clone the repository**:

```bash
git clone https://github.com/horlesqcookbook-ai.git
```

2. **Navigate to the project directory**:

```bash
cd cookbook-ai
```

3. **Install dependencies**:

```bash
npm install
```

4. **Set up environment variables**:
   
```bash
# Create .env.local file with:
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key
GROQ_API_KEY=your-groq-api-key
PEXELS_API_KEY=your-pexels-api-key
MONGODB_URI=your-mongodb-connection-string
```
   
5. **Start the development server**:

```bash
npm run dev
```

6. **Open your browser and navigate to http://localhost:3000 to access the application**.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

For any inquiries or feedback, feel free to reach out via:

-   GitHub: [Horlesq](https://github.com/horlesq)
-   Linkedin: [Adrian Horlescu](https://www.linkedin.com/in/adrian-horlescu/)
-   Website: [horly.dev](https://horly.dev)

---

For questions or suggestions, feel free to open an issue or submit a pull request.
