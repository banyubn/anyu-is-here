# Project Structure - Refactored

## Overview
This Vue.js application follows clean code principles with a well-organized architecture that separates concerns and promotes reusability.

## Folder Structure

```
src/
├── assets/          # Static assets (images, videos, CSS)
├── components/      # Reusable Vue components
├── composables/     # Composition API logic (business logic)
├── constants/       # Application constants and data
├── pages/           # Page components (route views)
├── router/          # Vue Router configuration
├── utils/           # Utility functions and helpers
├── App.vue          # Root component
└── main.js          # Application entry point
```

## Architecture Principles

### 1. **Composables** (`src/composables/`)
Reusable composition functions that encapsulate business logic and stateful behavior.

- `useTheme.js` - Theme management (dark/light mode)
- `useAnimations.js` - GSAP animation utilities
- `useCarousel.js` - Infinite carousel logic
- `useProgramming.js` - Programming page specific logic
- `useHome.js` - Home page specific logic

**Benefits:**
- Logic reusability across components
- Easier testing
- Clear separation of concerns
- Type-safe with TypeScript (future enhancement)

### 2. **Constants** (`src/constants/`)
All static data, configuration, and constants.

- `theme.js` - Theme colors and CSS variable mappings
- `programming.js` - Programming skills, projects, tech stack
- `home.js` - Home page data (stats, categories, achievements)

**Benefits:**
- Single source of truth for data
- Easy to update content
- Better maintainability
- Can be easily replaced with API calls

### 3. **Utils** (`src/utils/`)
Pure utility functions without side effects.

- `helpers.js` - Common helper functions (positioning, device detection)

**Benefits:**
- Reusable across the application
- Easy to test (pure functions)
- No dependencies on Vue

### 4. **Components** (`src/components/`)
Presentational components focused on UI rendering.

- Small, focused responsibility
- Receive data via props
- Emit events for parent communication
- No business logic

### 5. **Pages** (`src/pages/`)
Route-level components that compose smaller components.

- Use composables for logic
- Import constants for data
- Coordinate component composition
- Handle page-level state

## Code Quality Standards

### ✅ Do's
- Use Composition API for all new code
- Extract reusable logic into composables
- Keep components small and focused (< 300 lines)
- Use constants for static data
- Handle errors gracefully
- Use async/await for async operations
- Write meaningful variable/function names

### ❌ Don'ts
- Don't put business logic in templates
- Don't duplicate code
- Don't use unnecessary comments
- Don't mix concerns (keep separation)
- Don't use inline styles (use scoped CSS)
- Don't ignore error handling

## Migration Pattern

### Before (Bloated Component):
```vue
<script setup>
// 500+ lines of mixed logic, data, and methods
const data = [/* inline data */]
const method1 = () => { /* logic */ }
const method2 = () => { /* logic */ }
// ... many more
</script>
```

### After (Clean Component):
```vue
<script setup>
import { useFeature } from '@/composables/useFeature'
import { FEATURE_DATA } from '@/constants/feature'

const { state, action } = useFeature()
const data = FEATURE_DATA
</script>
```

## Import Aliases

- `@/` - Points to `src/` directory
- Example: `import { useTheme } from '@/composables/useTheme'`

## Best Practices

### Composables
```javascript
// Good: Descriptive function name starting with "use"
export function useUserProfile() {
  const user = ref(null)
  
  const fetchUser = async () => {
    try {
      // API call
    } catch (error) {
      console.error('Error fetching user:', error)
    }
  }
  
  return { user, fetchUser }
}
```

### Constants
```javascript
// Good: Use UPPER_CASE for constants
export const API_ENDPOINTS = {
  USERS: '/api/users',
  POSTS: '/api/posts',
}

// Good: Group related data
export const THEME_COLORS = { /* ... */ }
```

### Utils
```javascript
// Good: Pure function, no side effects
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}
```

## Testing Strategy (Future)

1. **Unit Tests**: Test composables and utils in isolation
2. **Component Tests**: Test component rendering and behavior
3. **E2E Tests**: Test user flows

## Performance Optimizations

- Lazy load routes with dynamic imports
- Use `computed` for derived state
- Implement virtual scrolling for long lists
- Optimize images and assets
- Code splitting by route

## Future Enhancements

1. Add TypeScript for type safety
2. Implement Pinia for global state management
3. Add API service layer
4. Implement error boundary component
5. Add loading states and skeletons
6. Implement proper SEO meta tags
7. Add analytics tracking
8. Implement CI/CD pipeline

## Development Workflow

1. **New Feature:**
   - Create constants if needed
   - Create composable for logic
   - Create/update components
   - Use in pages

2. **Refactoring:**
   - Identify duplicated code
   - Extract to composable/util
   - Update imports
   - Test thoroughly

## Contributing Guidelines

1. Follow the established folder structure
2. Use composables for reusable logic
3. Keep components focused and small
4. Write self-documenting code
5. Handle errors properly
6. Test your changes
7. Update documentation

## Maintenance

- Regular dependency updates
- Monitor bundle size
- Review and refactor when needed
- Keep documentation updated
- Performance audits

---

**Last Updated:** December 30, 2025
**Refactored By:** Senior Vue.js Engineer (AI)
