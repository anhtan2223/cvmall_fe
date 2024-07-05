export type ColConfig = {
  key: string
  key_field: string
  text_field: string
  title: string
  sort?: string | null
  is_sort?: boolean
  is_custom?: boolean
  type?: string
  number_fixed: number
  class: string
  width?: number
  is_color_map_border: boolean
  child: ColConfig[]
  is_hidden: boolean
  filters?: any[]
  filter_method?: any
  formatter?: (row: any, column: any, cellValue: any, index: number) => string
  sort_method?: any
}

export type TableConfig = {
  checkbox?: boolean
  action?: boolean
  showPaging?: boolean
  dbClick?: boolean
  index?: boolean
}


export type RowIndex = {
  row: number[]
  col: number
}
