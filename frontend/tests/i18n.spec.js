import { describe, it, expect, vi } from "vitest"
import i18n from '../src/i18n'

// Test 10: i18n language switching

describe('i18n', () => {
  it('changes language and translates keys', () => {
    i18n.global.locale.value = 'en'
    expect(i18n.global.t('home.title')).toBe('Learn Programming with EduVue')
    expect(i18n.global.availableLocales).toContain('pl')
    expect(i18n.global.availableLocales).toContain('en')
  })
})
