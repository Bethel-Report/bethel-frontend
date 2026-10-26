export type Bethel = {
  id: number
  name: string
  city: string
  state: string
  members: number
  status: "Ativo" | "Inativo"
}

export const bethels: Bethel[] = [
  {
    id: 1,
    name: "Bethel nº 01",
    city: "Fortaleza",
    state: "CE",
    members: 24,
    status: "Ativo",
  },
  {
    id: 2,
    name: "Bethel nº 02",
    city: "Caucaia",
    state: "CE",
    members: 18,
    status: "Ativo",
  },
  {
    id: 3,
    name: "Bethel nº 03",
    city: "Maracanaú",
    state: "CE",
    members: 21,
    status: "Ativo",
  },
  {
    id: 4,
    name: "Bethel nº 04",
    city: "Sobral",
    state: "CE",
    members: 16,
    status: "Ativo",
  },
  {
    id: 5,
    name: "Bethel nº 05",
    city: "Juazeiro do Norte",
    state: "CE",
    members: 20,
    status: "Ativo",
  },
  {
    id: 6,
    name: "Bethel nº 06",
    city: "Crato",
    state: "CE",
    members: 14,
    status: "Ativo",
  },
  {
    id: 7,
    name: "Bethel nº 07",
    city: "Quixadá",
    state: "CE",
    members: 12,
    status: "Inativo",
  },
  {
    id: 8,
    name: "Bethel nº 08",
    city: "Iguatu",
    state: "CE",
    members: 17,
    status: "Ativo",
  },
]
