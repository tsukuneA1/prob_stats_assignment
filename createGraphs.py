import pandas as pd
import matplotlib.pyplot as plt
import os

# 日本語フォントの設定 (ご自身の環境に合わせてフォント名を変更してください)
# Windows: "Yu Gothic", "Meiryo"など
# macOS: "Hiragino Sans"など
# Linux: "IPAexGothic"など (要インストール)
plt.rcParams['font.sans-serif'] = ['Yu Gothic']
plt.rcParams['axes.unicode_minus'] = False # マイナス記号の文字化け防止

# 入力・出力ディレクトリ
INPUT_DIR = './output'
OUTPUT_DIR = './output'

def plot_histogram(filename, title, xlabel, ylabel):
    """CSVからヒストグラムを作成し保存する"""
    print(f"グラフ作成中: {title}")
    df = pd.read_csv(f"{INPUT_DIR}/{filename}")
    plt.figure(figsize=(10, 6))
    
    # 棒グラフとしてプロット
    plt.bar(df.iloc[:, 0].astype(str), df.iloc[:, 1])
    
    plt.title(title, fontsize=16)
    plt.xlabel(xlabel, fontsize=12)
    plt.ylabel(ylabel, fontsize=12)
    plt.xticks(rotation=45, ha='right')
    plt.tight_layout()
    plt.savefig(f"{OUTPUT_DIR}/{filename.replace('.csv', '.png')}")
    plt.close()

def plot_line_chart(filename, title, y_cols):
    """CSVから折れ線グラフを作成し保存する"""
    print(f"グラフ作成中: {title}")
    df = pd.read_csv(f"{INPUT_DIR}/{filename}")
    plt.figure(figsize=(12, 6))
    
    for col in y_cols:
        plt.plot(df['n'], df[col], label=col)
        
    plt.title(title, fontsize=16)
    plt.xlabel('n (サンプルサイズ)', fontsize=12)
    plt.ylabel('値', fontsize=12)
    plt.legend()
    plt.grid(True)
    plt.tight_layout()
    plt.savefig(f"{OUTPUT_DIR}/{filename.replace('.csv', '.png')}")
    plt.close()

def main():
    """メイン処理"""
    if not os.path.exists(INPUT_DIR):
        print(f"エラー: 入力ディレクトリ'{INPUT_DIR}'が見つかりません。")
        print("先にTypeScriptスクリプトを実行してCSVファイルを生成してください。")
        return

    print("🚀 グラフ生成を開始します...")
    
    # ヒストグラム
    plot_histogram('p1-2_exponential_hist.csv', '問題1-2: 指数分布(λ=2)のヒストグラム', '乱数の区間', '生成数')
    plot_histogram('p1-3_pareto_hist.csv', '問題1-3: パレート分布(a=2, x₀=1)のヒストグラム', '乱数の区間', '生成数')
    plot_histogram('p2_normal_hist.csv', '問題2: N(2, 7)のヒストグラム', '乱数の区間', '生成数')
    plot_histogram('p3_poisson_hist.csv', '問題3: ポアソン分布(λ=1.62)のヒストグラム', 'Xの値', '生成数')

    # 折れ線グラフ
    plot_line_chart(
        'p1-4_p1-5_pareto_lln.csv', 
        '問題1-4 & 1-5: 大数の法則とサンプル分散',
        ['サンプル平均', 'サンプル分散']
    )
    
    print("\n🎉 全てのグラフが`output`フォルダにPNGファイルとして保存されました。")

if __name__ == '__main__':
    main()