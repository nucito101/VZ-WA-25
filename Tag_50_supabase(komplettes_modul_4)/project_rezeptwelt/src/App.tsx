import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router"
import Layout from "./layout/Layout"
import Home from "./pages/home/Home"
import NotFound from "./pages/notFound/NotFound"
import AboutUs from "./pages/aboutUs/AboutUs"
import MainProvider from "./context/MainProvider"
import RecipeDetail from "./pages/recipeDetail/RecipeDetail"
import RecipeList from "./pages/recipeList/RecipeList"
import Recipe from "./pages/recipe/recipe"

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route
        path="/"
        element={
          <MainProvider>
            <Layout />
          </MainProvider>
        }>
        <Route index element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipe />} />
        <Route path="/recipes/category/:categoryId" element={<RecipeList />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    )
  )
  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
