import { useEffect } from 'react';
import { useAuthStore } from '~/store/auth.store';
import { useWishlistStore } from '~/store/wishlist.store';
import { useAddressStore } from '~/store/address.store';

export function StoreRehydrator() {
  useEffect(() => {
    void useAuthStore.persist.rehydrate();
    void useWishlistStore.persist.rehydrate();
    void useAddressStore.persist.rehydrate();
  }, []);

  return null;
}
