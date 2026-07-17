import { Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AboutPage } from './pages/AboutPage'
import { ExhibitionPage } from './pages/ExhibitionPage'
import { HomePage } from './pages/HomePage'
import { ProjectPage } from './pages/ProjectPage'
import { WorkPage } from './pages/WorkPage'

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="exhibition" element={<ExhibitionPage />} />
        <Route path="work" element={<WorkPage />} />
        <Route path="work/:slug" element={<ProjectPage />} />
        <Route path="about" element={<AboutPage />} />
      </Route>
    </Routes>
  )
}

export default App
