# cocktail-db-frontend

### Building website

- Start builder container: `docker compose up --build -d`
- Open shell inside the container: `docker exec -it cocktail-db-frontend-builder bash`

Commands inside the container:
- `npm install`
- `npm run dev` - start dev server @  http://localhost:5173/
- `npm run build` - build for production
- `npm run type-check && npm run lint`
