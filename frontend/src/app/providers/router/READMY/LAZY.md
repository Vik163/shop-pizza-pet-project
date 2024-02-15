### Lazy

подгрузка файлов при открытии (файл ProfilePage) для уменьшения бандла

```javascript
import { type FC, lazy } from 'react';
import { type ProfilePageProps } from './ProfilePage';

export const ProfilePageAsync = lazy<FC<ProfilePageProps>>(
   () => import('./ProfilePage'),
);

```

#### loader

также необходимо указать, что должно отображаться во время его загрузки (`<Loader />`)

```javascript
<Suspense fallback={<Loader />}>
   <h2>Preview</h2>
   <ProfilePageAsync />
</Suspense>
```
