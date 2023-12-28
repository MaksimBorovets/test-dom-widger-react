import './App.css';
import DOMTreeWidget from './components/dom-tree-widget/DomTreeWidget';

function App() {
  return (
    <>
      <header id="header">
        <nav id="nav-home">Home</nav>
      </header>
      <main id="main-content">
        <aside id="sidebar">
          <div id="aside-content">This is aside</div>
          <address id="address">This is address</address>
          <article id="article2">Article 2</article>
        </aside>
        <div className="content-area" id="sections-container">
          <section id="section1">Section 1</section>
          <section id="section2">
            Section 1<article id="article1">Article 1</article>
          </section>
        </div>
      </main>
      <footer id="footer">This is footer</footer>
      <DOMTreeWidget />
    </>
  );
}

export default App;
