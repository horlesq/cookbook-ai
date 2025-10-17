import SearchBar from "@/components/SearchBar";
import FavoritesList from "@/components/FavoritesList";

export default function Page() {
    return (
        <div className="page-container">
            <SearchBar />
            <FavoritesList />
        </div>
    );
}
