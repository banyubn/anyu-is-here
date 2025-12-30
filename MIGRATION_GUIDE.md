# Quick Migration Guide

## How to Refactor Remaining Pages

Follow this pattern for **VideoEditing.vue**, **MusicProduction.vue**, and **Certificates.vue**.

## Step-by-Step Process

### 1. Identify Data (5-10 mins)
Look for:
- Arrays of objects (projects, skills, etc.)
- Configuration objects
- Static data that doesn't change

**Action**: Extract to `src/constants/[pagename].js`

Example for VideoEditing:
```javascript
// src/constants/videoEditing.js
export const VIDEO_TYPES = [
  { id: 1, name: '...', description: '...' },
  // ...
]

export const VIDEO_SOFTWARE = [
  // ...
]
```

### 2. Identify Business Logic (10-15 mins)
Look for:
- Event handlers (onClick, onHover, etc.)
- Complex calculations
- State management
- Modal/dialog logic

**Action**: Extract to `src/composables/use[PageName].js`

Example:
```javascript
// src/composables/useVideoEditing.js
import { ref } from 'vue'

export function useVideoEditing() {
  const selectedVideo = ref(null)
  
  const openModal = (video) => {
    selectedVideo.value = video
  }
  
  const closeModal = () => {
    selectedVideo.value = null
  }
  
  return {
    selectedVideo,
    openModal,
    closeModal,
  }
}
```

### 3. Identify Animation Logic (5 mins)
Look for:
- GSAP animations
- Scroll triggers
- Hover effects
- Counter animations

**Action**: Use existing `useAnimations` composable or extend it

### 4. Update the Component (10-15 mins)

**Before**:
```vue
<script setup>
// 100+ lines of data
const data = [...]
const videos = [...]
// etc

// 100+ lines of methods
const method1 = () => {}
const method2 = () => {}
// etc
</script>
```

**After**:
```vue
<script setup>
import { ref, onMounted } from 'vue'
import { useVideoEditing } from '@/composables/useVideoEditing'
import { useAnimations } from '@/composables/useAnimations'
import { VIDEO_TYPES, VIDEO_SOFTWARE } from '@/constants/videoEditing'

const { selectedVideo, openModal, closeModal } = useVideoEditing()
const { fadeInUp, animateCounter } = useAnimations()

const videoTypes = VIDEO_TYPES
const videoSoftware = VIDEO_SOFTWARE

// Only page-specific refs and onMounted logic here
const section = ref(null)

onMounted(() => {
  // Animations using composable functions
  fadeInUp('.video-card')
})
</script>
```

### 5. Test (5 mins)
- No build errors
- Page renders correctly
- Interactions work
- Animations work

## Quick Checklist

For each page:

- [ ] Create constants file (`src/constants/[pagename].js`)
- [ ] Create composable file (`src/composables/use[PageName].js`)
- [ ] Extract all data to constants
- [ ] Extract all logic to composable
- [ ] Update component imports
- [ ] Update component to use composables
- [ ] Test functionality
- [ ] Check for errors
- [ ] Verify no regressions

## Time Estimate Per Page

| Task | Time |
|------|------|
| Create constants | 5-10 min |
| Create composable | 10-15 min |
| Update component | 10-15 min |
| Testing | 5-10 min |
| **Total** | **30-50 min** |

## Common Patterns to Extract

### 1. Modal Management
```javascript
// In composable
const selectedItem = ref(null)
const isModalOpen = ref(false)

const openModal = (item) => {
  selectedItem.value = item
  isModalOpen.value = true
}

const closeModal = () => {
  selectedItem.value = null
  isModalOpen.value = false
}

return { selectedItem, isModalOpen, openModal, closeModal }
```

### 2. Hover Effects
```javascript
// In composable
const onCardHover = (event) => {
  const card = event.currentTarget
  gsap.to(card, {
    duration: 0.3,
    y: -8,
    scale: 1.02,
    ease: 'power2.out',
  })
}

const onCardLeave = (event) => {
  const card = event.currentTarget
  gsap.to(card, {
    duration: 0.3,
    y: 0,
    scale: 1,
    ease: 'power2.out',
  })
}

return { onCardHover, onCardLeave }
```

### 3. Filter/Search Logic
```javascript
// In composable
import { ref, computed } from 'vue'

const searchQuery = ref('')
const selectedCategory = ref('All')

const filteredItems = computed(() => {
  return items.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesCategory = selectedCategory.value === 'All' || item.category === selectedCategory.value
    return matchesSearch && matchesCategory
  })
})

return { searchQuery, selectedCategory, filteredItems }
```

## Don't Forget

1. **Update imports** in constants/index.js and composables/index.js
2. **Test thoroughly** after each refactoring
3. **Keep commits small** - one page at a time
4. **Document patterns** if you create new ones
5. **Reuse existing composables** when possible

## Example: Refactoring VideoEditing.vue

### Step 1: Create Constants
```javascript
// src/constants/videoEditing.js
export const VIDEO_TYPES = [ /* data */ ]
export const VIDEO_SOFTWARE = [ /* data */ ]
```

### Step 2: Create Composable
```javascript
// src/composables/useVideoEditing.js
export function useVideoEditing() {
  const selectedVideo = ref(null)
  // ... logic
  return { selectedVideo, openModal, closeModal }
}
```

### Step 3: Update Component
```vue
<script setup>
import { useVideoEditing } from '@/composables/useVideoEditing'
import { VIDEO_TYPES } from '@/constants/videoEditing'

const { selectedVideo, openModal } = useVideoEditing()
const videoTypes = VIDEO_TYPES
</script>
```

### Step 4: Update Barrel Exports
```javascript
// src/constants/index.js
export * from './videoEditing'

// src/composables/index.js
export { useVideoEditing } from './useVideoEditing'
```

## Need Help?

Refer to the already refactored files:
- ✅ `App.vue` - Simple example
- ✅ `Programming.vue` - Complex page with lots of data
- ✅ `Home.vue` - Complex interactions and animations

Copy the patterns from these files!

---

Happy refactoring! 🚀
