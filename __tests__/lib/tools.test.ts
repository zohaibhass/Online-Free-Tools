import { getToolBySlug, getCategory, getToolsByCategory, getAllTools } from '@/lib/tools'

describe('Tools Library', () => {
  describe('getToolBySlug', () => {
    it('should return a tool when slug exists', () => {
      const tool = getToolBySlug('json-formatter')
      expect(tool).toBeDefined()
      expect(tool?.name).toBe('JSON Formatter')
      expect(tool?.slug).toBe('json-formatter')
    })

    it('should return undefined when slug does not exist', () => {
      const tool = getToolBySlug('non-existent-tool')
      expect(tool).toBeUndefined()
    })

    it('should return tool with all required properties', () => {
      const tool = getToolBySlug('json-formatter')
      expect(tool).toHaveProperty('id')
      expect(tool).toHaveProperty('name')
      expect(tool).toHaveProperty('description')
      expect(tool).toHaveProperty('slug')
      expect(tool).toHaveProperty('category')
      expect(tool).toHaveProperty('featured')
    })
  })

  describe('getCategory', () => {
    it('should return a category when ID exists', () => {
      const category = getCategory('developer')
      expect(category).toBeDefined()
      expect(category?.name).toBe('Developer Tools')
    })

    it('should return undefined when category ID does not exist', () => {
      const category = getCategory('invalid-category')
      expect(category).toBeUndefined()
    })

    it('should have all required properties', () => {
      const category = getCategory('developer')
      expect(category).toHaveProperty('id')
      expect(category).toHaveProperty('name')
      expect(category).toHaveProperty('description')
    })
  })

  describe('getToolsByCategory', () => {
    it('should return tools for valid category', () => {
      const tools = getToolsByCategory('developer')
      expect(Array.isArray(tools)).toBe(true)
      expect(tools.length).toBeGreaterThan(0)
    })

    it('should return empty array for invalid category', () => {
      const tools = getToolsByCategory('invalid-category')
      expect(Array.isArray(tools)).toBe(true)
      expect(tools.length).toBe(0)
    })

    it('should only return tools from that category', () => {
      const tools = getToolsByCategory('developer')
      tools.forEach(tool => {
        expect(tool.category).toBe('developer')
      })
    })
  })

  describe('getAllTools', () => {
    it('should return all tools', () => {
      const tools = getAllTools()
      expect(Array.isArray(tools)).toBe(true)
      expect(tools.length).toBeGreaterThan(0)
    })

    it('should return at least 30 tools', () => {
      const tools = getAllTools()
      expect(tools.length).toBeGreaterThanOrEqual(30)
    })

    it('all tools should have required properties', () => {
      const tools = getAllTools()
      tools.forEach(tool => {
        expect(tool).toHaveProperty('id')
        expect(tool).toHaveProperty('name')
        expect(tool).toHaveProperty('slug')
        expect(tool).toHaveProperty('category')
      })
    })
  })
})
