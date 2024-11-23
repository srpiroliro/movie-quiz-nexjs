export interface Movie {
  id: number;
  title: string;
  image: string;
  description?: string;
  genre?: string;
  year?: number;
}

export const MOVIE_DATA: Movie[] = [
  {
    id: 1,
    title: "Bob In Translation",
    image: "/movies/bob-in-translation.webp",
    description:
      "Bob Pop es llença a parlar català conversant amb parelles lingüístiques del col·lectiu LGBTIQ+.",
  },
  {
    id: 2,
    title: "L'Eclipsi",
    image: "/movies/eclipsi.webp",
    description:
      "Laura Escanes, Nil Moliner o Oriol Romeu: les entrevistes més íntimes de la mà de Roger Escapa.",
  },
  {
    id: 4,
    title: "La Travessa",
    image: "/movies/travessa.webp",
    description:
      "El reality d'aventures més exigent de Catalunya, presentat per Laura Escanes.",
  },
  {
    id: 5,
    title: "Natura Sàvia",
    image: "/movies/naturas.webp",
    description:
      "La biodiversitat del territori català com no s'ha explicat mai.",
  },
  {
    id: 6,
    title: "Vosaltre Mateixos",
    image: "/movies/vm.webp",
    description:
      "Andreu Buenafuente improvisa escoltant històries dels espectadors.",
  },
  {
    id: 7,
    title: "Zenit",
    image: "/movies/zenit.webp",
    description:
      "Un talent musical incomparable per trobar el cantant més intergeneracional.",
  },
];