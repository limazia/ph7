## [1.0.1](https://github.com/limazia/ph7/compare/v1.0.0...v1.0.1) (2025-09-25)

### 📚 Documentação

* **README:** update installation instructions to use Yarn and remove npm references ([c572687](https://github.com/limazia/ph7/commit/c572687d52dc0944f733a102e5a0d817ffefb751))

## 1.0.0 (2025-09-25)

### ✨ Recursos

* **users:** add CRUD operations and Swagger documentation for user management ([957b68a](https://github.com/limazia/ph7/commit/957b68aba17580d33457c19b1f5bf54fa427e32a))
* **eslint:** add ESLint configuration for TypeScript project ([7163e45](https://github.com/limazia/ph7/commit/7163e45a2829c4f78402e73f1d9a44d6e02c5219))
* **release:** add GitHub Actions workflow for automated releases ([3d3a317](https://github.com/limazia/ph7/commit/3d3a3172e794be0af43813eba5a7a04811705888))
* **cors:** add initial CORS configuration for API ([8e274ba](https://github.com/limazia/ph7/commit/8e274ba3059bd6f91be6544c7f7d27c56cda54e2))
* **docker:** add initial docker-compose configuration for PostgreSQL service ([16524fe](https://github.com/limazia/ph7/commit/16524fe75f8022001a1777d079c301c3602c1227))
* **editorconfig:** add initial EditorConfig file for consistent coding styles ([4c8f4f2](https://github.com/limazia/ph7/commit/4c8f4f2a9a7ccf1e0b649da5bb59e9e3c8d8d64a))
* **migration:** add initial migration files for user table and lock configuration ([6d891e7](https://github.com/limazia/ph7/commit/6d891e72ee79497906d3ca9c2192f25aef5efbf2))
* **schema:** add initial Prisma schema for user management ([25d40db](https://github.com/limazia/ph7/commit/25d40dbe13bd78100b98759c0d71273bc07e3e27))
* **swagger:** add initial Swagger API documentation for user management ([e150a59](https://github.com/limazia/ph7/commit/e150a594f2fe871adb6bb908723cf88e15f4aadb))
* **package:** add missing scripts and dependencies for improved functionality ([b0b13d8](https://github.com/limazia/ph7/commit/b0b13d819e58bf852d790d39ec7436182bd99ba3))
* **prisma:** add prisma client initialization with graceful shutdown ([429b6f2](https://github.com/limazia/ph7/commit/429b6f228fefe410a6cb9639d46b97f43a4e2076))
* **swagger:** add script to generate Swagger documentation for PH7 API ([c2a6936](https://github.com/limazia/ph7/commit/c2a69361d1606ece9cc6e56328bb24c83867ceee))
* **seed:** add seed script for database initialization with admin and user accounts ([54612c4](https://github.com/limazia/ph7/commit/54612c4edbda306f4d38e967249f03c9db65c180))
* **releaserc:** add semantic release configuration with plugins for versioning and changelog generation ([f431005](https://github.com/limazia/ph7/commit/f431005c8c3d46e6be05714da6593780d4c1017e))
* **env:** add Swagger configuration to environment schema ([c946459](https://github.com/limazia/ph7/commit/c946459fd517aab761b518c9ecf43352a08081b3))
* **users:** add user DTOs and role management for user creation and updates ([1522be6](https://github.com/limazia/ph7/commit/1522be6369c3c132b8c0d5b736bcbd67c8173279))
* **tsconfig:** enable JSON module resolution for improved compatibility ([b92046b](https://github.com/limazia/ph7/commit/b92046be88bbce6fd07f361aa6068810afaf888a))
* **readme:** enhance README with detailed project description, installation steps, and usage instructions ([7990fa7](https://github.com/limazia/ph7/commit/7990fa7d95cf3688eb66e45b8ae261efa61e2c61))
* **users:** enhance update user functionality with email validation and password hashing ([7f9073e](https://github.com/limazia/ph7/commit/7f9073ea05bcb139448aca79874593dda0c7ee0d))
* **users:** enhance user management with validation and CRUD operations ([db87cee](https://github.com/limazia/ph7/commit/db87cee0ce92bfb29d0edff6fc282639071d9d66))
* **users:** implement delete user by ID functionality with error handling ([b266783](https://github.com/limazia/ph7/commit/b266783e2cc56a9042fc575a05eca1c613fa8770))
* **users:** implement pagination for user listing with total count ([65f4895](https://github.com/limazia/ph7/commit/65f48959cfbbb980b85e92d0fb1cade8e7a577db))
* **password:** implement password hashing and comparison functions ([187019b](https://github.com/limazia/ph7/commit/187019bfe3fb6600c3268a5e9fe12d5f1f96b9b1))
* **swagger:** implement Swagger setup for API documentation with basic authentication ([edf81d2](https://github.com/limazia/ph7/commit/edf81d24e97bcd75adec06c0007384afc30e73e1))
* **users:** implement user creation with email existence check and password hashing ([8e812ec](https://github.com/limazia/ph7/commit/8e812ec97467bd7041845618cc51a97a52c5a11f))
* **users:** improve find user by ID functionality with enhanced error handling and return user details ([9b91a58](https://github.com/limazia/ph7/commit/9b91a580b4c8999b4235931ee87ddf075d52977c))
* **env:** update .env.exemple with Swagger configuration and PostgreSQL settings ([cc9a7f0](https://github.com/limazia/ph7/commit/cc9a7f0c2b0e3ee51daa0c9e1de34d7f85c6e85e))

### 🐛 Correções de Bugs

* **index:** correct formatting and ensure consistent code style in user service exports ([a70fdfd](https://github.com/limazia/ph7/commit/a70fdfd24cad41204b37b9503a5995e9ab0862a7))
* **http-error:** correct formatting and ensure consistent code style ([90feeb8](https://github.com/limazia/ph7/commit/90feeb8d89c2eb543fedc75b8fd2e09d1ea279a1))
* **.gitignore:** correct formatting and ensure consistent line endings ([29a5711](https://github.com/limazia/ph7/commit/29a5711bdeb7ed73fda2f8ef5e95454d9e6c9381))
* **app:** correct import from app to server for server initialization ([8f3b591](https://github.com/limazia/ph7/commit/8f3b591a197a01a11108ed1f145daaa2d4dafadd))
* **swagger:** update user ID example format in schema for clarity ([4406bd5](https://github.com/limazia/ph7/commit/4406bd5563921730b0c0dfafff210c9aa38bcffa))

### 🔨 Refatoração de Código

* **server:** rename app to server and update middleware usage ([b0edb29](https://github.com/limazia/ph7/commit/b0edb29a81026a6e87d2411fb11dde6b48027e51))
