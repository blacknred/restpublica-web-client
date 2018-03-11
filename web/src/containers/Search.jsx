



















<div>
                                    <TrendingBlock />
                                    <UsersBlock />
                                    <PostsList
                                        mode='trending'
                                        isFullAccess={false} />
                                </div>


<div>
                                    <SearchBlock />
                                    <UsersBlock />
                                    <PostsList
                                        mode={`search${location.search}`}
                                        isFullAccess={false}
                                    />
                                </div>import TrendingBlock from '../components/TrendingBlock';
import UsersBlock from '../components/UsersBlock';
import SearchBlock from '../components/SearchBlock';
import PostsList from './PostsList';



?SearchBlock
?TrendingBlock
UsersList
PostsList

trending/
-----------    
AuthorsBlock
Posts

trending/posts||authors  search/query/posts||authors
-----------------------------------------------------
DiscoveryTabs
DiscoveryContent : Posts||Authors
