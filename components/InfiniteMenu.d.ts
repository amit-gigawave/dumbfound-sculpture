import React from 'react';

interface InfiniteMenuItem {
  image: string;
  link: string;
  title: string;
  description: string;
}

interface InfiniteMenuProps {
  items: InfiniteMenuItem[];
  scale?: number;
}

declare const InfiniteMenu: React.FC<InfiniteMenuProps>;

export default InfiniteMenu;
